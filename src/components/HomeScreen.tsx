import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import StrategyWaitlistModal from "./StrategyWaitlistModal";

interface HomeScreenProps {
  onSelectInspiration: () => void;
}

export default function HomeScreen({ onSelectInspiration }: HomeScreenProps) {
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8">
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
          Invoque ta muse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-editorial text-xl sm:text-2xl text-[#5C5449] italic max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Entre inspiration et stratégie, laisse ta muse te guider
        </motion.p>
      </div>

      {/* Section Divider */}
      <div className="text-center mb-10 relative">
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] flex-grow max-w-[120px] bg-gradient-to-r from-transparent via-[#D9CEBC] to-transparent" />
          <h2 className="font-display text-xs sm:text-sm font-semibold text-[#1A1715] tracking-[0.22em] uppercase">
            Choisis ton guide
          </h2>
          <span className="h-[1px] flex-grow max-w-[120px] bg-gradient-to-r from-transparent via-[#D9CEBC] to-transparent" />
        </div>
      </div>

      {/* The 2 Muse Portals Cards */}
      <div className="relative mb-16 max-w-4xl mx-auto">
        {/* Subtle gallery soft lighting behind cards */}
        <div className="absolute -inset-x-6 -inset-y-10 pointer-events-none -z-10 select-none overflow-visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(245,239,228,0.7)_0%,_rgba(250,248,245,0)_70%)] blur-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Muse de l'inspiration */}
          <motion.button
            id="muse-inspiration-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={onSelectInspiration}
            className="relative flex flex-col text-left pt-9 pb-8 px-8 sm:px-9 rounded-2xl border border-[#E8E1D5] hover:border-[#B89A62] transition-all duration-300 cursor-pointer h-full group bg-white/95 backdrop-blur-xs shadow-[0_6px_28px_-4px_rgba(40,32,20,0.06),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-8px_rgba(40,32,20,0.12)] overflow-hidden"
          >
            {/* Micro ancient gold top hairline indicator */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A876] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Bar with Label */}
            <div className="flex items-center justify-end mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#EBF3ED] border border-[#C2DEC9] text-[#346643] px-3.5 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-[0.14em] uppercase shadow-3xs">
                <Sparkles className="w-3 h-3 text-[#3D7850]" />
                Gratuit
              </span>
            </div>

            {/* Card Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1715] group-hover:text-[#8F7242] transition-colors duration-300 mb-3 leading-snug">
              Muse de l'inspiration
            </h3>

            {/* Description */}
            <p className="font-sans text-sm sm:text-[15px] text-[#5C5449] leading-relaxed flex-grow mb-8 font-normal">
              Idées, angles et hooks pour ton contenu
            </p>

            {/* Call to action button */}
            <div className="mt-auto w-full relative z-10">
              <div className="inline-flex items-center justify-between text-xs font-sans font-semibold tracking-[0.14em] uppercase px-5 py-3.5 rounded-xl transition-all duration-300 border bg-[#FAF8F5] group-hover:bg-[#1A1715] text-[#1A1715] group-hover:text-[#FAF8F5] border-[#D9CEBC] group-hover:border-[#1A1715] w-full shadow-2xs">
                <span>Invoquer l'inspiration</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#8F7242] group-hover:text-[#C5A876]" />
              </div>
            </div>
          </motion.button>

          {/* Card 2: Muse de la stratégie */}
          <motion.button
            id="muse-strategy-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => setIsStrategyModalOpen(true)}
            className="relative flex flex-col text-left pt-9 pb-8 px-8 sm:px-9 rounded-2xl border border-[#E8E1D5] hover:border-[#B89A62] transition-all duration-300 cursor-pointer h-full group bg-white/95 backdrop-blur-xs shadow-[0_6px_28px_-4px_rgba(40,32,20,0.06),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-8px_rgba(40,32,20,0.12)] overflow-hidden"
          >
            {/* Micro ancient gold top hairline indicator */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A876] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Bar with Label */}
            <div className="flex items-center justify-end mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#F7F2E8] border border-[#E3D4BC] text-[#8F7242] px-3.5 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-[0.14em] uppercase shadow-3xs">
                <Clock className="w-3 h-3 text-[#B89A62]" />
                Bientôt disponible
              </span>
            </div>

            {/* Card Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1715] group-hover:text-[#8F7242] transition-colors duration-300 mb-3 leading-snug">
              Muse de la stratégie
            </h3>

            {/* Description */}
            <p className="font-sans text-sm sm:text-[15px] text-[#5C5449] leading-relaxed flex-grow mb-8 font-normal">
              Des stratégies pour faire connaître tes livres
            </p>

            {/* Call to action button */}
            <div className="mt-auto w-full relative z-10">
              <div className="inline-flex items-center justify-between text-xs font-sans font-semibold tracking-[0.14em] uppercase px-5 py-3.5 rounded-xl transition-all duration-300 border bg-[#FAF8F5] group-hover:bg-[#F5EFE4] text-[#1A1715] border-[#D9CEBC] group-hover:border-[#B89A62] w-full shadow-2xs">
                <span>Découvrir & s'inscrire</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#8F7242]" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Pop-up Modale pour la Muse de la Stratégie */}
      <StrategyWaitlistModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />
    </div>
  );
}
