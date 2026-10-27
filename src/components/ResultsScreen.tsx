import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Download, RefreshCw, ArrowLeft, Sparkles, Feather, Heart, MessageCircle, Send } from "lucide-react";
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
    text += `🏛️ MUSE CRÉATIVE - TON PLAN COMPLICE\n`;
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

  const handleDownloadFile = () => {
    const fullText = getFullTextExport();
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `plan_contenu_${etape.toLowerCase().replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8">
      {/* Upper Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E1D5]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#736B5E] hover:text-[#1A1715] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#8F7242]" />
          Choisir une autre étape
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F5EFE4] text-[#8F7242] hover:text-[#6E5429] border border-[#D9CEBC] rounded-lg text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Piocher de nouvelles idées
          </button>

          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F5EFE4] text-[#1A1715] border border-[#D9CEBC] rounded-lg text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all shadow-xs cursor-pointer"
          >
            {globalCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#5B7C65]" />
                Plan copié !
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8F7242]" />
                Tout copier d'un coup
              </>
            )}
          </button>

          <button
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#5C5449] hover:text-[#1A1715] border border-[#E8E1D5] rounded-lg text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all shadow-xs cursor-pointer"
            title="Télécharger en fichier .txt"
          >
            <Download className="w-3.5 h-3.5 text-[#8F7242]" />
            Exporter .TXT
          </button>
        </div>
      </div>

      {/* Main Editorial Headers */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-[10.5px] font-sans font-semibold text-[#8F7242] bg-[#F5EFE3] border border-[#D9CEBC] px-3 py-1 rounded-full uppercase tracking-[0.16em] mb-3.5 shadow-3xs">
          <Heart className="w-3 h-3 text-[#B89A62]" />
          Ton calendrier éditorial personnalisé
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1715] tracking-tight">
          Tes idées de contenu
        </h2>
        <p className="font-editorial text-sm sm:text-base text-[#5C5449] mt-2.5 max-w-xl italic">
          Étape : <strong className="text-[#8F7242] font-medium not-italic bg-[#F5EFE4] border border-[#E8E1D5] px-2.5 py-0.5 rounded-md ml-1 font-sans text-xs uppercase tracking-wider">{etape}</strong>
        </p>
      </div>

      {/* Ideas Stack */}
      <div className="space-y-8 mb-12">
        <AnimatePresence mode="popLayout">
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/95 backdrop-blur-xs rounded-xl border border-[#E8E1D5] shadow-[0_4px_20px_-4px_rgba(40,32,20,0.05),0_1px_3px_rgba(0,0,0,0.02)] p-7 sm:p-9 hover:border-[#B89A62] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A876] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="space-y-5 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="font-editorial text-xs italic tracking-widest text-[#8F7242]">
                        Proposition {index + 1}
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-[26px] font-medium text-[#1A1715] group-hover:text-[#8F7242] transition-colors duration-300 leading-snug">
                      {item.idee}
                    </h4>

                    {/* Accroche text container styled like an editorial pull-quote */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-[#8F7242] flex items-center gap-1.5">
                        <Feather className="w-3 h-3 text-[#B89A62]" />
                        Angle & Accroche conceptuelle suggérés :
                      </span>
                      <div className="bg-[#FAF8F4] rounded-lg border-l-2 border-[#B89A62] p-4 sm:p-5 text-sm sm:text-[15.5px] text-[#24201B] leading-relaxed whitespace-pre-wrap italic font-editorial">
                        "{item.accroche}"
                      </div>
                    </div>

                    {/* Comment structurer ton post */}
                    {item.structure && item.structure.length > 0 && (
                      <div className="space-y-2.5 pt-1">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-[#8F7242] block">
                          Comment structurer ton post :
                        </span>
                        <ol className="list-none space-y-2">
                          {item.structure.map((etapeStr, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-[13.5px] text-[#4A433A] font-sans">
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F5EFE4] border border-[#D9CEBC] text-[#8F7242] font-editorial text-[11px] shrink-0 mt-0.5">
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
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-[#8F7242] block">
                          Pourquoi ça marche :
                        </span>
                        <div className="bg-[#FAF8F5] border border-[#E8E1D5] px-4 py-3 rounded-lg text-xs sm:text-[13px] text-[#5C5449] leading-relaxed italic font-editorial">
                          {item.pourquoi_ca_marche}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Copier + Favori */}
                  <div className="shrink-0 flex sm:flex-col justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleCopyOne(fullPostText, index)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all shadow-xs cursor-pointer ${
                        isCopied
                          ? "bg-[#5B7C65] text-white border border-[#5B7C65]"
                          : "bg-[#FAF8F5] hover:bg-[#F5EFE4] text-[#1A1715] border border-[#D9CEBC] hover:border-[#B89A62]"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#8F7242]" />
                          Copier le concept
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleToggleFavorite(item)}
                      disabled={favLoading === item.originalIdee}
                      title={isFavorited(item.originalIdee) ? "Retirer des favoris" : "Ajouter aux favoris"}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all shadow-xs cursor-pointer disabled:opacity-50 ${
                        isFavorited(item.originalIdee)
                          ? "bg-[#F5EFE4] text-[#8F7242] border border-[#B89A62]"
                          : "bg-[#FAF8F5] hover:bg-[#F5EFE4] text-[#5C5449] hover:text-[#8F7242] border border-[#D9CEBC] hover:border-[#B89A62]"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorited(item.originalIdee) ? "fill-[#B89A62] text-[#8F7242]" : "text-[#8F7242]"}`} />
                      {isFavorited(item.originalIdee) ? "En favori" : "Favori"}
                    </button>
                  </div>
                </div>

                {/* Retour sur l'idée */}
                <div className="mt-6 border-t border-[#E8E1D5] pt-4">
                  {feedbackSent === index ? (
                    <p className="text-xs text-[#3D6E4E] font-medium flex items-center gap-1.5">
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
                        className="w-full text-sm rounded-lg border border-[#D9CEBC] bg-[#FAF8F5] px-3 py-2 text-[#1A1715] placeholder:text-[#9E9485] focus:outline-none focus:border-[#B89A62] focus:ring-2 focus:ring-[#B89A62]/20 transition-all resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSendFeedback(item, index)}
                          disabled={!feedbackText.trim()}
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#8F7242] hover:text-[#6E5429] disabled:opacity-40 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Envoyer
                        </button>
                        <button
                          onClick={() => { setFeedbackOpen(null); setFeedbackText(""); }}
                          className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#736B5E] hover:text-[#1A1715] cursor-pointer"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setFeedbackOpen(index)}
                      className="font-editorial italic text-[13px] text-[#736B5E] hover:text-[#8F7242] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#B89A62]" />
                      Cette idée ne t'inspire pas ? Dis-nous pourquoi
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Prominent Regeneration Card */}
      <div className="flex flex-col items-center justify-center gap-3 mb-10 bg-white/80 backdrop-blur-xs border border-[#E8E1D5] rounded-xl p-8 sm:p-10 text-center shadow-xs">
        <p className="text-sm font-medium text-[#4A433A]">
          Ces propositions ne t'inspirent pas complètement ou tu veux voir d'autres angles ?
        </p>
        <button
          onClick={onRegenerate}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#F5EFE4] text-[#1A1715] border border-[#D9CEBC] hover:border-[#B89A62] rounded-lg text-xs font-sans font-semibold tracking-[0.14em] uppercase transition-all shadow-xs hover:shadow-sm cursor-pointer mt-1"
        >
          <RefreshCw className="w-4 h-4 text-[#8F7242]" />
          Générer d'autres idées
        </button>
        <p className="text-xs text-[#736B5E]">
          Nous piocherons 3 nouvelles idées différentes sans répéter celles déjà vues dans ta session.
        </p>
      </div>

      {/* Advice Section */}
      <div className="p-6 sm:p-8 bg-white/70 rounded-xl border border-[#E8E1D5] text-center mb-8 shadow-xs">
        <h5 className="font-display text-xs sm:text-sm font-semibold text-[#1A1715] tracking-[0.2em] uppercase mb-2.5 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" />
          Liberté de création ! ✨
        </h5>
        <p className="font-editorial italic text-sm sm:text-[15px] text-[#5C5449] max-w-2xl mx-auto leading-relaxed">
          Ces propositions sont des <strong>angles créatifs</strong> et des points de départ pour t'inspirer. N'hésite pas à les tordre, à y insérer tes anecdotes personnelles et à les adapter à ta plume unique. Rien ne remplace ta propre voix !
        </p>
      </div>

      {/* Footer controls */}
      <div className="flex justify-center mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-[#736B5E] hover:text-[#1A1715] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#8F7242]" />
          Retour au choix d'options
        </button>
      </div>
    </div>
  );
}



