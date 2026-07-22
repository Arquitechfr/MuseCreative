import { memo } from "react";
import { motion } from "motion/react";
import { BookOpen, Heart } from "lucide-react";

interface GeneratingScreenProps {
  etape: string;
}

export default memo(GeneratingScreen);

function GeneratingScreen({ etape }: GeneratingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-xl mx-auto min-h-[50vh]">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20 bg-[#5c1d24]/10 rounded-full flex items-center justify-center text-[#5c1d24] mb-8 relative"
      >
        <BookOpen className="w-10 h-10" />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-[#5c1d24]/30"
        />
      </motion.div>

      <h3 className="font-serif text-2xl font-semibold text-[#2c2520] mb-3">
        Préparation de tes idées de contenu
      </h3>
      
      <p className="text-sm text-[#c5a059] font-medium tracking-wide uppercase mb-8 flex items-center justify-center gap-1.5">
        <Heart className="w-3.5 h-3.5 fill-[#c5a059]" /> {etape}
      </p>

      <div className="w-48 h-1 bg-[#5c1d24]/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 bottom-0 w-1/3 bg-[#5c1d24] rounded-full"
        />
      </div>
    </div>
  );
}
