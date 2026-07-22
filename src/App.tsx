import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { EtapeType, GeneratedIdea } from "./types";
import WelcomeScreen from "./components/WelcomeScreen";
import GeneratingScreen from "./components/GeneratingScreen";
import ResultsScreen from "./components/ResultsScreen";

export default function App() {
  const [step, setStep] = useState<"welcome" | "generating" | "results">("welcome");
  const [etape, setEtape] = useState<EtapeType | null>(null);
  const [seenIdeas, setSeenIdeas] = useState<string[]>([]);

  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const handleGeneratePlan = async (selectedEtape: EtapeType, useSeenIdeas: boolean = true) => {
    setStep("generating");

    const currentSeen = useSeenIdeas === false ? [] : seenIdeas;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          etape: selectedEtape,
          titreLivre: "",
          seenIdeas: currentSeen,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de communication avec le serveur.");
      }

      const data = await response.json();
      const newIdeas = data.ideas || [];
      setGeneratedIdeas(newIdeas);

      // Accumulate seen ideas
      const newlySeen = newIdeas.map((item: any) => item.originalIdee);
      setSeenIdeas(prev => {
        const base = data.hasReset ? [] : (useSeenIdeas === false ? [] : prev);
        return Array.from(new Set([...base, ...newlySeen]));
      });

      setStep("results");
    } catch (err: any) {
      console.error(err);
      // If error occurs, we can try to fall back locally on the client side
      try {
        // Simple local fallback generation
        const { ideas } = await import("./data/ideas");
        const filtered = ideas.filter((item) => item.etapes.includes(selectedEtape));
        const currentSeenList = useSeenIdeas === false ? [] : seenIdeas;
        let remaining = filtered.filter((item) => !currentSeenList.includes(item.idee));
        let resetHappened = false;
        
        if (remaining.length < 3) {
          remaining = filtered;
          resetHappened = true;
        }

        const shuffled = [...remaining].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        const results = selected.map((item) => {
          return {
            originalIdee: item.idee,
            idee: item.idee,
            accroche: item.accroche.replace(/\[titre du livre\]/gi, "ton roman"),
            structure: item.structure || [],
            pourquoi_ca_marche: item.pourquoi_ca_marche || "",
          };
        });

        setGeneratedIdeas(results);

        const newlySeen = results.map(item => item.originalIdee);
        setSeenIdeas(prev => {
          const base = resetHappened ? [] : (useSeenIdeas === false ? [] : prev);
          return Array.from(new Set([...base, ...newlySeen]));
        });

        setStep("results");
      } catch (innerErr) {
        setStep("welcome");
      }
    }
  };

  const handleSelectEtape = (selectedEtape: EtapeType) => {
    setEtape(selectedEtape);
    setSeenIdeas([]);
    handleGeneratePlan(selectedEtape, false);
  };

  const handleBackToWelcome = () => {
    setStep("welcome");
    setEtape(null);
    setSeenIdeas([]);
  };

  const handleRegenerate = () => {
    if (etape) {
      handleGeneratePlan(etape, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0E6] via-[#FFC5B5] to-[#FFA095] text-[#2d1b15] flex flex-col selection:bg-[#F4C2C2]/30 selection:text-[#5c1d24] relative overflow-x-hidden">
      {/* Soft gradient background — lightweight, no blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#FBC8A6]/30" />
        <div className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] max-w-[450px] max-h-[450px] rounded-full bg-[#F7D6D6]/30" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#F7D6D6]/25" />
      </div>

      {/* Premium Top Cozy Glass Header */}
      <header className="border-b border-[#F4C2C2]/40 bg-white/30 sticky top-0 z-50 shadow-[0_2px_12px_rgba(244,194,194,0.12)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={handleBackToWelcome}
            className="flex items-center hover:opacity-85 transition-opacity cursor-pointer text-left select-none gap-2 sm:gap-3"
          >
            <span className="font-serif-elegant text-xl sm:text-2xl font-bold tracking-tight text-[#2d1b15] select-none pb-0.5">
              Muse Créative
            </span>
            <div className="w-9 h-7 sm:w-10 sm:h-8 relative rotate-[12deg] transform origin-center flex items-center justify-center -mt-1">
              <svg
                viewBox="0 0 120 90"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Backing cover shadow (pink) */}
                <path
                  d="M 12,28 C 30,22 45,26 60,30 C 75,26 90,22 108,28 L 104,74 C 88,68 73,72 60,76 C 47,72 32,68 16,74 Z"
                  fill="#FFCAD4"
                  stroke="#2d1b15"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Main Book Pages (Lighter Pink) */}
                <path
                  d="M 14,26 C 31,20 46,24 60,28 C 74,24 89,20 106,26 L 102,70 C 86,64 71,68 60,72 C 49,68 34,64 18,70 Z"
                  fill="#FDE2E4"
                  stroke="#2d1b15"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Spine Line */}
                <path d="M 60,28 L 60,72" stroke="#2d1b15" strokeWidth="2" strokeLinecap="round" />
                
                {/* Additional Page Stacking Lines */}
                <path d="M 18,71.5 C 34,65.5 49,69.5 60,73.5" stroke="#2d1b15" strokeWidth="1.2" />
                <path d="M 102,71.5 C 86,65.5 71,69.5 60,73.5" stroke="#2d1b15" strokeWidth="1.2" />
                <path d="M 18,73 C 34,67 49,71 60,75" stroke="#2d1b15" strokeWidth="1.2" />
                <path d="M 102,73 C 86,67 71,71 60,75" stroke="#2d1b15" strokeWidth="1.2" />

                {/* Heart on Right Page */}
                <path
                  d="M 82,53 C 82,53 76,47 76,43 C 76,39.5 79,37 82,39.5 C 85,37 88,39.5 88,43 C 88,47 82,53 82,53 Z"
                  fill="#FFCAD4"
                  stroke="#2d1b15"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </button>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#605249]/80 tracking-wide">
            <span className="inline-flex items-center gap-1 bg-[#5c1d24]/10 border border-[#5c1d24]/20 text-[#5c1d24] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-3xs">
              <Heart className="w-2.5 h-2.5 fill-[#5c1d24] stroke-[#5c1d24]" />
              Romance Edition
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Stage with Screen Transitions */}
      <main className="flex-grow py-6 relative">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeScreen onSelectEtape={handleSelectEtape} />
            </motion.div>
          )}

          {step === "generating" && etape && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GeneratingScreen etape={etape} />
            </motion.div>
          )}

          {step === "results" && etape && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsScreen
                ideas={generatedIdeas}
                etape={etape}
                onBack={handleBackToWelcome}
                onRegenerate={handleRegenerate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Visual footer details */}
      <footer className="bg-white/5 border-t border-[#F4C2C2]/40 py-8 text-center text-xs text-[#2d1b15]/70 relative z-10 shadow-[0_-4px_16px_rgba(244,194,194,0.1)]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Muse Créative.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#F4C2C2] transition-colors cursor-default">Fait par une autrice, pour des autrices</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
