import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface GeneratingScreenProps {
  etape: string;
}

export default function GeneratingScreen({ etape }: GeneratingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-xl mx-auto min-h-[50vh]">
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-18 h-18 bg-[#F5EFE4] border border-[#D9CEBC] rounded-full flex items-center justify-center text-[#8F7242] mb-8 relative shadow-xs"
      >
        {/* Literary Quill / Folio geometry */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-[#8F7242]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>

        {/* Ethereal golden ring ripple */}
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-[#B89A62]/35"
        />
      </motion.div>

      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1715] mb-3 tracking-normal">
        Préparation de tes idées de contenu
      </h3>
      
      <p className="text-[11px] text-[#8F7242] font-semibold tracking-[0.2em] uppercase mb-8 flex items-center justify-center gap-2 font-sans">
        <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" /> {etape}
      </p>

      <div className="w-52 h-[2px] bg-[#E8E1D5] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#B89A62] to-transparent rounded-full"
        />
      </div>
    </div>
  );
}


