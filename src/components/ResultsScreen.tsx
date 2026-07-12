import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Download, RefreshCw, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { GeneratedIdea } from "../types";

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [globalCopied, setGlobalCopied] = useState(false);

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

    text += `Généré avec tendresse par Ma librairie à contenu ✨`;
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Upper Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#605249]/80 hover:text-[#4A9B7F] font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Choisir une autre étape
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#faf8f5] text-[#4A9B7F] hover:text-[#387a63] border border-[#B8E0D2]/50 rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer"
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

          <button
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-[#faf8f5] text-[#605249] border border-[#605249]/20 rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer"
            title="Télécharger en fichier .txt"
          >
            <Download className="w-4 h-4" />
            Exporter .TXT
          </button>
        </div>
      </div>

      {/* Main Headers */}
      <div className="mb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4A9B7F] bg-[#B8E0D2]/15 border border-[#B8E0D2]/40 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          <Heart className="w-3 h-3 fill-[#4A9B7F]/40 text-[#4A9B7F]" />
          Ton calendrier éditorial personnalisé
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A9B7F]">
          Tes idées de contenu
        </h2>
        <p className="text-sm text-[#605249] mt-2 max-w-xl">
          Étape : <strong className="text-[#4A9B7F] bg-[#B8E0D2]/10 px-2 py-0.5 rounded-md">{etape}</strong>
        </p>
      </div>

      {/* Ideas Stack */}
      <div className="space-y-6 mb-8">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-2xl border border-[#B8E0D2]/50 shadow-3xs p-6 sm:p-8 hover:shadow-xs hover:border-[#B8E0D2]/90 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative left bar */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#B8E0D2]" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-2">
                  <div className="space-y-3 flex-grow">
                    <h4 className="font-serif text-xl font-bold text-[#2c2520] group-hover:text-[#4A9B7F] transition-colors pt-1">
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
                              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#B8E0D2]/20 text-[#4A9B7F] font-bold text-[10px] shrink-0 mt-0.5">
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

                  {/* Copy Button Box */}
                  <div className="shrink-0 flex sm:flex-col justify-end pt-2">
                    <button
                      onClick={() => handleCopyOne(fullPostText, index)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer ${
                        isCopied
                          ? "bg-[#387a63] text-white"
                          : "bg-[#faf8f5] text-[#4A9B7F] border border-[#B8E0D2]/40 hover:bg-gradient-to-r hover:from-[#F4C2C2] hover:to-[#FBC8A6] hover:text-[#2d1b15] hover:border-transparent"
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
                  </div>
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
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#B8E0D2] via-[#FBC8A6] to-[#F4C2C2] hover:opacity-95 text-[#2d1b15] rounded-xl text-base font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
          className="inline-flex items-center gap-2 text-sm text-[#605249] hover:text-[#4A9B7F] font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au choix d'options
        </button>
      </div>
    </div>
  );
}
