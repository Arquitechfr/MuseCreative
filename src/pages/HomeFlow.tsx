import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EtapeType, GeneratedIdea } from "../types";
import WelcomeScreen from "../components/WelcomeScreen";
import GeneratingScreen from "../components/GeneratingScreen";
import ResultsScreen from "../components/ResultsScreen";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";

export default function HomeFlow() {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [step, setStep] = useState<"welcome" | "generating" | "results">("welcome");
  const [etape, setEtape] = useState<EtapeType | null>(null);
  const [seenIdeas, setSeenIdeas] = useState<string[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [authPrompted, setAuthPrompted] = useState(false);

  const handleGeneratePlan = async (selectedEtape: EtapeType, useSeenIdeas: boolean = true) => {
    setStep("generating");

    const currentSeen = useSeenIdeas === false ? [] : seenIdeas;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etape: selectedEtape,
          titreLivre: "",
          seenIdeas: currentSeen,
        }),
      });

      if (!response.ok) throw new Error("Erreur de communication avec le serveur.");

      const data = await response.json();
      const newIdeas = data.ideas || [];
      setGeneratedIdeas(newIdeas);

      const newlySeen = newIdeas.map((item: any) => item.originalIdee);
      setSeenIdeas(prev => {
        const base = data.hasReset ? [] : (useSeenIdeas === false ? [] : prev);
        return Array.from(new Set([...base, ...newlySeen]));
      });

      if (!isAuthenticated && !authPrompted) {
        setAuthPrompted(true);
        openAuthModal("signup", "Crée ton compte pour voir tes idées");
      }

      setStep("results");
    } catch (err: any) {
      console.error(err);
      try {
        const { ideas } = await import("../data/ideas");
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
        const results = selected.map((item) => ({
          originalIdee: item.idee,
          idee: item.idee,
          accroche: item.accroche.replace(/\[titre du livre\]/gi, "ton roman"),
          structure: item.structure || [],
          pourquoi_ca_marche: item.pourquoi_ca_marche || "",
        }));

        setGeneratedIdeas(results);

        const newlySeen = results.map(item => item.originalIdee);
        setSeenIdeas(prev => {
          const base = resetHappened ? [] : (useSeenIdeas === false ? [] : prev);
          return Array.from(new Set([...base, ...newlySeen]));
        });

        if (!isAuthenticated && !authPrompted) {
          setAuthPrompted(true);
          openAuthModal("signup", "Crée ton compte pour voir tes idées");
        }

        setStep("results");
      } catch (innerErr) {
        setStep("welcome");
      }
    }
  };

  const handleSelectEtape = (selectedEtape: EtapeType) => {
    setEtape(selectedEtape);
    setSeenIdeas([]);
    setAuthPrompted(false);
    handleGeneratePlan(selectedEtape, false);
  };

  const handleBackToWelcome = () => {
    setStep("welcome");
    setEtape(null);
    setSeenIdeas([]);
    setAuthPrompted(false);
  };

  const handleRegenerate = () => {
    if (etape) handleGeneratePlan(etape, true);
  };

  return (
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
  );
}
