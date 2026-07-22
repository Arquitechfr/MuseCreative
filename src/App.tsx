import { useState, useCallback } from "react";
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

  const handleGeneratePlan = useCallback(async (selectedEtape: EtapeType, useSeenIdeas: boolean = true) => {
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
  }, [seenIdeas]);

  const handleSelectEtape = useCallback((selectedEtape: EtapeType) => {
    setEtape(selectedEtape);
    setSeenIdeas([]);
    handleGeneratePlan(selectedEtape, false);
  }, [handleGeneratePlan]);

  const handleBackToWelcome = useCallback(() => {
    setStep("welcome");
    setEtape(null);
    setSeenIdeas([]);
  }, []);

  const handleRegenerate = useCallback(() => {
    if (etape) {
      handleGeneratePlan(etape, true);
    }
  }, [etape, handleGeneratePlan]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F7D6D6] to-[#FBC8A6] text-[#2d1b15] flex flex-col selection:bg-[#F4C2C2]/30 selection:text-[#5c1d24] relative overflow-x-hidden">
      {/* Sun-kissed Soft Blurry Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Soft Peach Bubble */}
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[550px] max-h-[550px] rounded-full bg-[#FBC8A6]/40 blur-[80px] sm:blur-[100px] will-change-transform" />

        {/* Soft Rose Poudré Bubble */}
        <div className="absolute top-[20%] right-[-10%] w-[65vw] h-[65vw] max-w-[500px] max-h-[500px] rounded-full bg-[#F7D6D6]/45 blur-[80px] sm:blur-[100px] will-change-transform" />

        {/* Warm Peach Glow Bottom */}
        <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#F7D6D6]/30 blur-[80px] sm:blur-[100px] will-change-transform" />
      </div>

      {/* Premium Top Cozy Glass Header */}
      <header className="border-b border-[#F4C2C2]/40 bg-white/10 backdrop-blur-sm sticky top-0 z-50 shadow-[0_2px_12px_rgba(244,194,194,0.12)]" style={{ contain: 'layout paint' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={handleBackToWelcome}
            className="flex items-center hover:opacity-85 transition-opacity cursor-pointer text-left select-none gap-2 sm:gap-2.5"
          >
            <span className="font-serif-elegant text-xl sm:text-2xl font-bold tracking-tight leading-none bg-gradient-to-r from-[#f43f5e] via-[#eb8351] to-[#fdba74] bg-clip-text text-transparent select-none pb-0.5">
              Ma librairie à contenu
            </span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 relative rotate-[10deg] transform origin-center flex items-center justify-center -mt-1">
              <svg
                viewBox="0 0 100 80"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Soft Background Fill for the book pages */}
                <path
                  d="M 50,15 
                     C 50,15 35,11 15,15 
                     C 8,16.5 5,19 5,19 
                     L 5,59 
                     C 5,59 8,56.5 15,55 
                     C 35,51 50,55 50,55 
                     C 50,55 65,51 85,55 
                     C 92,56.5 95,59 95,59 
                     L 95,19 
                     C 95,19 92,16.5 85,15 
                     C 65,11 50,15 50,15 Z"
                  fill="#fffdfa"
                />
                
                {/* Stacked bottom pages effect */}
                <path
                  d="M 5,55 C 5,55 8,52.5 15,51 C 35,47 50,51 50,51 C 50,51 65,47 85,51 C 92,52.5 95,55 95,55"
                  stroke="#eb8351"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 5,57 C 5,57 8,54.5 15,53 C 35,49 50,53 50,53 C 50,53 65,49 85,53 C 92,54.5 95,57 95,57"
                  stroke="#eb8351"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                
                {/* Main Page Outline */}
                <path
                  d="M 50,15 
                     C 50,15 35,11 15,15 
                     C 8,16.5 5,19 5,19 
                     L 5,59 
                     C 5,59 8,56.5 15,55 
                     C 35,51 50,55 50,55 
                     C 50,55 65,51 85,55 
                     C 92,56.5 95,59 95,59 
                     L 95,19 
                     C 95,19 92,16.5 85,15 
                     C 65,11 50,15 50,15 Z"
                  stroke="#eb8351"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                
                {/* Book center spine line */}
                <path
                  d="M 50,15 L 50,55"
                  stroke="#eb8351"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                {/* Heart in the right page */}
                <path
                  d="M 72.5,39 C 72.5,39 67,33 67,28 C 67,24 70,21 72.5,24 C 75,21 78,24 78,28 C 78,33 72.5,39 72.5,39 Z"
                  fill="#ffe4e6"
                  stroke="#eb8351"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#605249]/80 tracking-wide">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#d1f7e8] to-[#a9f1df] border-[#065f46]/15 text-[#065f46] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-3xs">
              <Heart className="w-2.5 h-2.5 fill-[#065f46] stroke-[#065f46]" />
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
          <p>© 2026 Ma librairie à contenu.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#F4C2C2] transition-colors cursor-default">Fait par une autrice, pour des autrices</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
