import { useState, useEffect } from "react";
import { EtapeType, GeneratedIdea } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { addFavorite, removeFavorite, subscribeToFavorites, FavoriteItem } from "../services/favoritesService";

interface ResultsScreenProps {
  ideas: GeneratedIdea[];
  etape: EtapeType;
  onChangeStage: () => void;
  onRegenerate: () => void;
}

const ETAPE_PHRASE: Record<EtapeType, string> = {
  "Manuscrit en cours d'écriture": "ton manuscrit en cours",
  "Pré-lancement": "le lancement de ton livre",
  "Livre sorti": "faire vivre ton livre déjà sorti",
};

const conceptText = (idea: GeneratedIdea) => {
  const steps = idea.structure?.length ? idea.structure.map((s, i) => `  ${i + 1}. ${s}`).join("\n") : "";
  return `Titre : ${idea.idee}\n\nTon accroche :\n${idea.accroche}\n\nComment structurer ton post :\n${steps}\n\nPourquoi ça marche :\n${idea.pourquoi_ca_marche}`;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* presse-papiers indisponible : on affiche quand même la confirmation */
  }
}

export default function ResultsScreen({ ideas, etape, onChangeStage, onRegenerate }: ResultsScreenProps) {
  const { user, isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favLoading, setFavLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState<Record<number, boolean>>({});
  const [feedbackOpen, setFeedbackOpen] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeToFavorites(user.uid, setFavorites);
    return () => unsub();
  }, [user?.uid]);

  // Nouvelles idées : cartes repliées et formulaires refermés
  useEffect(() => {
    setOpenDetails({});
    setFeedbackOpen(null);
    setFeedbackText("");
  }, [ideas]);

  const flash = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
  };

  const favoriteId = (idea: GeneratedIdea) => favorites.find((f) => f.originalIdee === idea.originalIdee)?.id;

  const toggleFavorite = async (idea: GeneratedIdea) => {
    if (!isAuthenticated) {
      openAuthModal("signup", "Crée ton compte pour sauvegarder tes favoris");
      return;
    }
    if (!user?.uid) return;
    const favId = favoriteId(idea);
    setFavLoading(idea.originalIdee);
    try {
      if (favId) await removeFavorite(user.uid, favId);
      else await addFavorite(user.uid, idea, etape);
    } catch (err) {
      console.error("Favorite toggle error:", err);
    } finally {
      setFavLoading(null);
    }
  };

  const sendFeedback = async (idea: GeneratedIdea, index: number) => {
    if (!feedbackText.trim()) return;
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaIdee: idea.idee, etape, comment: feedbackText, userEmail: user?.email || "anonyme" }),
      });
      setFeedbackSent(index);
      setFeedbackText("");
      setFeedbackOpen(null);
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  const copyAll = () => {
    copyText(ideas.map(conceptText).join("\n\n--------------------\n\n"));
    flash("all");
  };

  return (
    <div className="r-main">
      <div className="r-bar">
        <div className="r-context">
          <p>Érato t'a soufflé trois idées pour {ETAPE_PHRASE[etape]}</p>
          <button type="button" className="link-back" onClick={onChangeStage}>
            Changer d'étape
          </button>
        </div>
        <div className="r-bar-actions">
          <button type="button" className="pill" onClick={onRegenerate}>
            Piocher d'autres idées
          </button>
          <button type="button" className={`pill${copied === "all" ? " ok" : ""}`} onClick={copyAll}>
            {copied === "all" ? "Plan copié !" : "Tout copier d'un coup"}
          </button>
        </div>
      </div>

      <div className="ideas">
        {ideas.map((idea, k) => {
          const fav = !!favoriteId(idea);
          const open = !!openDetails[k];
          return (
            <article key={idea.originalIdee + k} className="idea" style={{ ["--d" as string]: `${k * 110}ms` }}>
              <div className="idea-head">
                <div>
                  <p className="idea-num">Proposition {k + 1}</p>
                  <h3 className="idea-title">{idea.idee}</h3>
                </div>
                <div className="idea-actions">
                  <button
                    type="button"
                    className={`pill${copied === `c${k}` ? " ok" : ""}`}
                    onClick={() => {
                      copyText(conceptText(idea));
                      flash(`c${k}`);
                    }}
                  >
                    {copied === `c${k}` ? "Copié !" : "Copier le concept"}
                  </button>
                  <button
                    type="button"
                    className={`pill${fav ? " on" : ""}`}
                    aria-pressed={fav}
                    disabled={favLoading === idea.originalIdee}
                    onClick={() => toggleFavorite(idea)}
                  >
                    {fav ? "En favori" : "Favori"}
                  </button>
                </div>
              </div>

              <div className="hook">
                <div className="hook-top">
                  <p className="idea-label">Ton accroche</p>
                  <div className="hook-tools">
                    <button
                      type="button"
                      className={`mini${copied === `h${k}` ? " ok" : ""}`}
                      onClick={() => {
                        copyText(idea.accroche);
                        flash(`h${k}`);
                      }}
                    >
                      {copied === `h${k}` ? "Copiée !" : "Copier l'accroche"}
                    </button>
                  </div>
                </div>
                <blockquote className="idea-quote">{idea.accroche}</blockquote>
              </div>

              <button
                type="button"
                className="toggle"
                aria-expanded={open}
                onClick={() => setOpenDetails((o) => ({ ...o, [k]: !o[k] }))}
              >
                {open ? "Masquer la construction" : "Voir comment le construire"}
              </button>

              {open && (
                <div className="details">
                  {idea.structure?.length > 0 && (
                    <>
                      <p className="idea-label">Comment structurer ton post</p>
                      <ol className="idea-steps">
                        {idea.structure.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </>
                  )}
                  {idea.pourquoi_ca_marche && (
                    <>
                      <p className="idea-label">Pourquoi ça marche</p>
                      <p className="idea-why">{idea.pourquoi_ca_marche}</p>
                    </>
                  )}
                </div>
              )}

              <div className="idea-fb">
                {feedbackSent === k ? (
                  <p className="fb-ok">Merci pour ton retour !</p>
                ) : feedbackOpen === k ? (
                  <>
                    <textarea
                      id={`feedback-${k}`}
                      rows={2}
                      aria-label="Ton retour"
                      placeholder="Dis-nous pourquoi cette idée ne te convient pas..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      autoFocus
                    />
                    <div className="fb-row">
                      <button type="button" className="fb-link" disabled={!feedbackText.trim()} onClick={() => sendFeedback(idea, k)}>
                        Envoyer
                      </button>
                      <button
                        type="button"
                        className="fb-link muted"
                        onClick={() => {
                          setFeedbackOpen(null);
                          setFeedbackText("");
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  </>
                ) : (
                  <button type="button" className="fb-link" onClick={() => setFeedbackOpen(k)}>
                    Cette idée ne t'inspire pas ? Dis-nous pourquoi
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <section className="r-more">
        <p>Ces propositions ne t'inspirent pas complètement ou tu veux voir d'autres angles ?</p>
        <button type="button" className="pill big" onClick={onRegenerate}>
          Piocher d'autres idées
        </button>
        <p className="small">Nous piocherons 3 nouvelles idées différentes sans répéter celles déjà vues dans ta session.</p>
      </section>

      <section className="r-free">
        <h4>Liberté de création !</h4>
        <p>
          Ces propositions sont des <strong>angles créatifs</strong> et des points de départ pour t'inspirer. N'hésite pas à
          les tordre, à y insérer tes anecdotes personnelles et à les adapter à ta plume unique. Rien ne remplace ta propre
          voix !
        </p>
      </section>

      <button type="button" className="link-back center" onClick={onChangeStage}>
        Changer d'étape
      </button>
    </div>
  );
}
