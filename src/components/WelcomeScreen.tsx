import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { EtapeType } from "../types";

interface WelcomeScreenProps {
  onSelectEtape: (etape: EtapeType) => void;
  onBackToMuses?: () => void;
}

export default function WelcomeScreen({ onSelectEtape, onBackToMuses }: WelcomeScreenProps) {
  const cards: {
    etape: EtapeType;
    title: string;
    description: string;
    numeral: string;
  }[] = [
    {
      etape: "Manuscrit en cours d'écriture",
      title: "Manuscrit en cours",
      description: "J'écris mon premier manuscrit, je cherche mes marques et je commence à fédérer ma communauté.",
      numeral: "I",
    },
    {
      etape: "Pré-lancement",
      title: "Pré-lancement / Teasing",
      description: "Mon livre est prêt, je prépare activement sa sortie officielle et je veux faire monter la hype !",
      numeral: "II",
    },
    {
      etape: "Livre sorti",
      title: "Livre déjà sorti",
      description: "Mon roman est disponible ! Je veux continuer à le faire vivre, fidéliser mes lectrices et booster mes ventes.",
      numeral: "III",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8">
      {onBackToMuses && (
        <div className="mb-6">
          <button
            onClick={onBackToMuses}
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#736B5E] hover:text-[#1A1715] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#8F7242]" />
            Retour aux muses
          </button>
        </div>
      )}

      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-xs sm:text-sm text-[#736B5E] uppercase font-sans font-semibold tracking-[0.22em] mb-4"
        >
          Ton outil d'inspiration de contenu pour les réseaux sociaux
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.01em] text-[#1A1715] mb-5 leading-[1.12]"
        >
          + de 100 idées de contenu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-editorial text-xl sm:text-2xl text-[#5C5449] italic max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Prêtes à piocher pour tes réseaux sociaux
        </motion.p>
      </div>

      {/* Section Divider & Step Prompt */}
      <div className="text-center mb-10 relative">
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] flex-grow max-w-[120px] bg-gradient-to-r from-transparent via-[#D9CEBC] to-transparent" />
          <h2 className="font-display text-xs sm:text-sm font-semibold text-[#1A1715] tracking-[0.22em] uppercase">
            Dis-moi où tu en es
          </h2>
          <span className="h-[1px] flex-grow max-w-[120px] bg-gradient-to-r from-transparent via-[#D9CEBC] to-transparent" />
        </div>
      </div>

      {/* Haute-Couture Publishing Cards */}
      <div className="relative mb-16">
        {/* Subtle gallery soft lighting behind cards */}
        <div className="absolute -inset-x-6 -inset-y-10 pointer-events-none -z-10 select-none overflow-visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(245,239,228,0.7)_0%,_rgba(250,248,245,0)_70%)] blur-2xl" />
        </div>

        {/* The 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cards.map((card, index) => {
            return (
              <motion.button
                key={card.etape}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                onClick={() => onSelectEtape(card.etape)}
                className="relative flex flex-col text-left pt-8 pb-7 px-7 rounded-xl border border-[#E6DEC-E8E1D5] border-[#E8E1D5] hover:border-[#B89A62] transition-all duration-300 cursor-pointer h-full group bg-white/90 backdrop-blur-xs shadow-[0_4px_24px_-4px_rgba(40,32,20,0.05),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_-6px_rgba(40,32,20,0.09)] overflow-hidden"
              >
                {/* Micro ancient gold top hairline indicator */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A876] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Subtle Roman Numeral watermark in corner */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-editorial text-xs italic tracking-widest text-[#9E8052]">
                    Étape {card.numeral}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9CEBC] group-hover:bg-[#B89A62] transition-colors" />
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#1A1715] group-hover:text-[#8F7242] transition-colors duration-300 mb-3 leading-snug">
                  {card.title}
                </h3>

                {/* Literary Description */}
                <p className="font-sans text-[13.5px] text-[#5C5449] leading-relaxed flex-grow mb-8 font-normal">
                  {card.description}
                </p>

                {/* Refined Minimal Button */}
                <div className="mt-auto w-full relative z-10">
                  <div className="inline-flex items-center justify-between text-xs font-sans font-semibold tracking-[0.14em] uppercase px-4 py-2.5 rounded-lg transition-all duration-300 border bg-[#FAF8F5] hover:bg-[#F5EFE4] text-[#1A1715] border-[#D9CEBC] group-hover:border-[#B89A62] w-full">
                    <span>C'est parti</span>
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1 text-[#8F7242]">→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}



