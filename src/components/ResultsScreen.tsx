import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, RefreshCw, ArrowLeft, Heart, Sparkles, MessageCircle, Send } from "lucide-react";
import { GeneratedIdea } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { addFavorite, removeFavorite, subscribeToFavorites, FavoriteItem } from "../services/favoritesService";

interface ResultsScreenProps {
  ideas: GeneratedIdea[];
  etape: string;
  onBack: () => void;
  onRegenerate: () => void;
}

export default function ResultsScreen({
  ideas,
  etape,
  onBack,
  onRegenerate
}: ResultsScreenProps) {
  const { user, isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [globalCopied, setGlobalCopied] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favLoading, setFavLoading] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeToFavorites(user.uid, setFavorites);
    return () => unsub();
  }, [user?.uid]);

  const isFavorited = (ideaIdee: string) =>
    favorites.some((f) => f.originalIdee === ideaIdee);

  const getFavoriteId = (ideaIdee: string) =>
    favorites.find((f) => f.originalIdee === ideaIdee)?.id;

  const handleToggleFavorite = async (idea: GeneratedIdea) => {
    if (!isAuthenticated) {
      openAuthModal("signup", "Crée ton compte pour sauvegarder tes favoris");
      return;
    }
    if (!user?.uid) return;

    const favId = getFavoriteId(idea.originalIdee);
    setFavLoading(idea.originalIdee);
    try {
      if (favId) {
        await removeFavorite(user.uid, favId);
      } else {
        await addFavorite(user.uid, idea, etape);
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    } finally {
      setFavLoading(null);
    }
  };

  const handleSendFeedback = async (idea: GeneratedIdea, index: number) => {
    if (!feedbackText.trim()) return;
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaIdee: idea.idee,
          etape,
          comment: feedbackText,
          userEmail: user?.email || "anonyme",
        }),
      });
      setFeedbackSent(index);
      setFeedbackText("");
      setFeedbackOpen(null);
      setTimeout(() => setFeedbackSent(null), 3000);
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  const handleCopyOne = (textToCopy: string, index: number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const getFullTextExport = () => {
    let text = `==================================================\n`;
    text += `📚 MA LIBRAIRIE À CONTENU - TON PLAN COMPLICE\n`;
    text += `Étape : ${etape}\n`;
    text += `==================================================\n\n`;

    ideas.forEach((item, index) => {
      text += `💡 IDÉE ${index + 1} : ${item.idee}\n`;
      text += `✍️ Ton Accroche / Hook :\n${item.accroche}\n\n`;
      if (item.structure && item.structure.length > 0) {
        text += `📋 Comment structurer ton post :\n`;
        item.structure.forEach((step, stepIdx) => {
          text += `  ${stepIdx + 1}. ${step}\n`;
        });
        text += `\n`;
      }
      if (item.pourquoi_ca_marche) {
        text += `🎯 Pourquoi ça marche :\n${item.pourquoi_ca_marche}\n`;
      }
      text += `\n--------------------------------------------------\n\n`;
    });

    text += `Généré avec tendresse par Muse Créative ✨`;
    return text;
  };

  const handleCopyAll = () => {
    const fullText = getFullTextExport();
    navigator.clipboard.writeText(fullText);
    setGlobalCopied(true);
    setTimeout(() => setGlobalCopied(false), 2200);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Upper Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#605249]/80 hover:text-[#D55C66] font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Choisir une autre étape
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#faf8f5] text-[#D55C66] hover:text-[#b33e48] border border-[#D55C66]/30 rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Piocher de nouvelles idées
          </button>

          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4C2C2] to-[#FBC8A6] hover:opacity-90 text-[#2d1b15] rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer"
          >
            {globalCopied ? (
              <>
                <Check className="w-4 h-4" />
                Plan copié !
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Tout copier d'un coup
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Headers */}
      <div className="mb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D55C66] bg-[#D55C66]/10 border border-[#D55C66]/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Heart className="w-3 h-3 fill-[#D55C66]/30 text-[#D55C66]" />
          Ton calendrier éditorial personnalisé
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#D55C66]">
          Tes idées de contenu
        </h2>
        <p className="text-sm text-[#605249] mt-2 max-w-xl">
          Étape : <strong className="text-[#D55C66] bg-[#D55C66]/10 px-2 py-0.5 rounded-md">{etape}</strong>
        </p>
      </div>

      {/* Ideas Stack */}
      <div className="space-y-6 mb-8">
        <AnimatePresence mode="wait">
          {ideas.map((item, index) => {
            const stepsText = item.structure && item.structure.length > 0 
              ? item.structure.map((s, i) => `  ${i + 1}. ${s}`).join("\n") 
              : "";
            
            const fullPostText = `Titre : ${item.idee}

Angle & Accroche :
${item.accroche}

Comment structurer ton post :
${stepsText}

Pourquoi ça marche :
${item.pourquoi_ca_marche}`;

            const isCopied = copiedIndex === index;

            return (
              <motion.div
                id={`idea-card-${index}`}
                key={item.originalIdee + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl border border-[#D55C66]/20 shadow-3xs p-6 sm:p-8 hover:shadow-xs hover:border-[#D55C66]/50 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative left bar */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#D55C66] to-[#FBC8A6]" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-2">
                  <div className="space-y-3 flex-grow">
                    <h4 className="font-serif text-xl font-bold text-[#2c2520] group-hover:text-[#D55C66] transition-colors pt-1">
                      {item.idee}
                    </h4>

                    {/* Accroche text container styled like a book card */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#605249]/50 block">Angle & Accroche conceptuelle suggérés :</span>
                      <div className="bg-[#faf8f5] rounded-xl border border-[#605249]/5 p-4 sm:p-5 text-sm text-[#2c2520] leading-relaxed whitespace-pre-wrap italic font-serif">
                        {item.accroche}
                      </div>
                    </div>

                    {/* Comment structurer ton post */}
                    {item.structure && item.structure.length > 0 && (
                      <div className="space-y-1.5 pt-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#605249]/50 block">
                          Comment structurer ton post :
                        </span>
                        <ol className="list-none space-y-2">
                          {item.structure.map((etapeStr, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5 text-xs text-[#605249]">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D55C66]/10 text-[#D55C66] font-bold text-[10px] shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span className="leading-relaxed">{etapeStr}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Pourquoi ça marche */}
                    {item.pourquoi_ca_marche && (
                      <div className="space-y-1 pt-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#605249]/50 block">
                          Pourquoi ça marche :
                        </span>
                        <div className="bg-[#FBC8A6]/15 border-l-2 border-[#FBC8A6] px-3.5 py-2.5 rounded-r-xl text-xs text-[#605249] leading-relaxed italic">
                          {item.pourquoi_ca_marche}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Copy + Favorite Button Box */}
                  <div className="shrink-0 flex sm:flex-col justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleCopyOne(fullPostText, index)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer ${
                        isCopied
                          ? "bg-[#b33e48] text-white"
                          : "bg-[#faf8f5] text-[#D55C66] border border-[#D55C66]/25 hover:bg-gradient-to-r hover:from-[#FFA3A5] hover:to-[#FFD1B3] hover:text-[#5c1d24] hover:border-transparent"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier le concept
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleToggleFavorite(item)}
                      disabled={favLoading === item.originalIdee}
                      title="Ajouter aux favoris"
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer disabled:opacity-50 ${
                        isFavorited(item.originalIdee)
                          ? "bg-[#D55C66]/10 text-[#D55C66] border border-[#D55C66]/30"
                          : "bg-[#faf8f5] text-[#605249] border border-[#605249]/15 hover:border-[#D55C66]/30 hover:text-[#D55C66]"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavorited(item.originalIdee) ? "fill-[#D55C66]" : ""}`}
                      />
                      {isFavorited(item.originalIdee) ? "En favori" : "Favori"}
                    </button>
                  </div>
                </div>

                {/* Feedback link */}
                <div className="mt-3 pl-2 border-t border-[#605249]/10 pt-3">
                  {feedbackSent === index ? (
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Merci pour ton retour !
                    </p>
                  ) : feedbackOpen === index ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Dis-nous pourquoi cette idée ne te convient pas..."
                        rows={2}
                        className="w-full text-xs rounded-lg border border-[#605249]/15 bg-[#faf8f5] px-3 py-2 text-[#2c2520] placeholder:text-[#605249]/40 focus:outline-none focus:border-[#D55C66]/40 transition-all resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSendFeedback(item, index)}
                          disabled={!feedbackText.trim()}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D55C66] hover:text-[#b33e48] disabled:opacity-40 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Envoyer
                        </button>
                        <button
                          onClick={() => { setFeedbackOpen(null); setFeedbackText(""); }}
                          className="text-xs text-[#605249]/60 hover:text-[#605249] cursor-pointer"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setFeedbackOpen(index)}
                      className="text-xs text-[#605249]/50 hover:text-[#D55C66] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Cette idée ne t'inspire pas ? Dis-nous pourquoi
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Big prominent "Générer d'autres idées" under the 3 proposals */}
      <div className="flex flex-col items-center justify-center gap-3 mb-12 bg-[#F4C2C2]/15 border border-[#F4C2C2]/30 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-sm font-medium text-[#605249]">
          Ces propositions ne t'inspirent pas complètement ou tu veux voir d'autres angles ?
        </p>
        <button
          onClick={onRegenerate}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#FFA3A5] via-[#FFE2E4] to-[#FFD1B3] hover:opacity-95 text-[#2d1b15] rounded-xl text-base font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <RefreshCw className="w-5 h-5 animate-spin-slow" />
          Générer d'autres idées
        </button>
        <p className="text-xs text-[#605249]/60">
          Nous piocherons 3 nouvelles idées différentes sans répéter celles déjà vues dans ta session.
        </p>
      </div>

      {/* Advice Section */}
      <div className="p-6 bg-white rounded-2xl border border-[#605249]/10 text-center mb-8">
        <h5 className="font-serif text-lg font-bold text-[#2c2520] mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          Liberté de création ! ✨
        </h5>
        <p className="text-sm text-[#605249] max-w-xl mx-auto leading-relaxed">
          Ces propositions sont des <strong>angles créatifs</strong> et des points de départ pour t'inspirer. N'hésite pas à les tordre, à y insérer tes anecdotes personnelles et à les adapter à ta plume unique. Rien ne remplace ta propre voix !
        </p>
      </div>

      {/* Footer controls */}
      <div className="flex justify-center mb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#605249] hover:text-[#D55C66] font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au choix d'options
        </button>
      </div>
    </div>
  );
}
