import { motion } from "motion/react";
import { EtapeType } from "../types";

interface WelcomeScreenProps {
  onSelectEtape: (etape: EtapeType) => void;
}

export default function WelcomeScreen({ onSelectEtape }: WelcomeScreenProps) {
  const cards: {
    etape: EtapeType;
    title: string;
    description: string;
    bannerColor: string;
    borderColor: string;
    btnBg: string;
    btnText: string;
  }[] = [
    {
      etape: "Manuscrit en cours d'écriture",
      title: "Manuscrit en cours",
      description: "J'écris mon premier manuscrit, je cherche mes marques et je commence à fédérer ma communauté.",
      bannerColor: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3]",
      borderColor: "hover:border-[#FFA3A5]/50",
      btnBg: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 border-[#FFA3A5]/10 shadow-2xs hover:shadow-xs",
      btnText: "text-[#5c1d24]",
    },
    {
      etape: "Pré-lancement",
      title: "Pré-lancement / Teasing",
      description: "Mon livre est prêt, je prépare activement sa sortie officielle et je veux faire monter la hype !",
      bannerColor: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3]",
      borderColor: "hover:border-[#FFA3A5]/50",
      btnBg: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 border-[#FFA3A5]/10 shadow-2xs hover:shadow-xs",
      btnText: "text-[#5c1d24]",
    },
    {
      etape: "Livre sorti",
      title: "Livre déjà sorti",
      description: "Mon roman est disponible ! Je veux continuer à le faire vivre, fidéliser mes lectrices et booster mes ventes.",
      bannerColor: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3]",
      borderColor: "hover:border-[#FFA3A5]/50",
      btnBg: "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 border-[#FFA3A5]/10 shadow-2xs hover:shadow-xs",
      btnText: "text-[#5c1d24]",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-lg sm:text-xl text-black font-medium leading-relaxed mb-4"
        >
          Ton outil d'inspiration de contenu pour les réseaux sociaux
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-elegant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 select-none text-[#D55C66] pb-1"
        >
          + de 100 idées de contenu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-black max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Prêtes à piocher pour tes réseaux sociaux
        </motion.p>
      </div>

      <div className="text-center mt-20 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2d1b15] tracking-tight select-none"
        >
          Dis-moi où tu en es
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card, index) => {
          return (
            <motion.button
              key={card.etape}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onSelectEtape(card.etape)}
              className={`relative flex flex-col text-left pt-10 pb-8 px-6 sm:px-8 rounded-[28px] border border-white/70 transition-all duration-300 cursor-pointer h-full group bg-[#fffdfa]/97 shadow-[0_12px_32px_-5px_rgba(96,82,73,0.06),0_8px_16px_-6px_rgba(96,82,73,0.02)] hover:shadow-[0_24px_48px_-5px_rgba(213,92,102,0.18),0_12px_24px_-10px_rgba(213,92,102,0.1)] ${card.borderColor} overflow-hidden`}
            >
              {/* Colored top banner */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${card.bannerColor}`} />

              <h3 className="font-serif text-xl font-bold text-[#2c2520] mb-3 group-hover:text-[#D55C66] transition-colors duration-300">
                {card.title}
              </h3>
              
              {/* Soft literary serif description */}
              <p className="font-serif text-[15px] text-[#4e3f35] leading-relaxed flex-grow">
                {card.description}
              </p>
              
              {/* True styled padded cozy button */}
              <div className="mt-6 w-full">
                <div className={`inline-flex items-center justify-center text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all duration-300 gap-2 border ${card.btnBg} ${card.btnText} shadow-xs w-full`}>
                  <span>C'est parti</span>
                  <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
