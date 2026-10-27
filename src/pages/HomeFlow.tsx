import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { EtapeType, GeneratedIdea } from "../types";
import HomeScreen, { MuseId } from "../components/HomeScreen";
import InvocationScreen from "../components/InvocationScreen";
import GeneratingScreen from "../components/GeneratingScreen";
import ResultsScreen from "../components/ResultsScreen";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { emitGoldDust, setGoldDustOver } from "../lib/goldDust";

type Overlay = { muse: MuseId; open: boolean; cx: number; cy: number };

const CLOSE_MS = 1100; // durée de la fermeture en cercle (cf. .reveal dans olympe.css)

export default function HomeFlow() {
  const { isAuthenticated } = useAuth();
  const { isOpen, openAuthModal } = useAuthModal();
  const location = useLocation();
  const [step, setStep] = useState<"home" | "generating" | "results">("home");
  const [etape, setEtape] = useState<EtapeType | null>(null);
  const [seenIdeas, setSeenIdeas] = useState<string[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [authPrompted, setAuthPrompted] = useState(false);
  const [pendingResults, setPendingResults] = useState(false);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const wasModalOpen = useRef(false);
  const lastLocationKey = useRef(location.key);
  const overlayToken = useRef(0);

  /* ---------- Écran d'invocation (Érato / Uranie) ---------- */
  const openOverlay = useCallback((muse: MuseId, cx: number, cy: number, burst: boolean) => {
    const token = ++overlayToken.current;
    if (burst) emitGoldDust(cx, cy, 90, 5);
    setOverlay({ muse, open: false, cx, cy });
    setTimeout(() => {
      if (overlayToken.current !== token) return;
      setOverlay((o) => (o ? { ...o, open: true } : o));
      setGoldDustOver(true);
    }, burst ? 380 : 20);
  }, []);

  const closeOverlay = useCallback((cx?: number, cy?: number) => {
    const token = ++overlayToken.current;
    setGoldDustOver(false);
    setOverlay((o) => (o ? { ...o, open: false, cx: cx ?? o.cx, cy: cy ?? o.cy } : o));
    setTimeout(() => {
      if (overlayToken.current === token) setOverlay(null);
    }, CLOSE_MS);
  }, []);

  useEffect(() => () => setGoldDustOver(false), []);

  // Échap referme l'écran d'invocation
  useEffect(() => {
    if (!overlay?.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStep((s) => (s === "results" ? s : "home"));
        closeOverlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay?.open, closeOverlay]);

  // Un clic sur le logo (navigation vers "/") ramène à l'accueil des muses
  useEffect(() => {
    if (lastLocationKey.current === location.key) return;
    lastLocationKey.current = location.key;
    setStep("home");
    setEtape(null);
    setSeenIdeas([]);
    setAuthPrompted(false);
    setPendingResults(false);
    if (overlay) closeOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  /* ---------- Génération des idées (inchangée) ---------- */
  useEffect(() => {
    if (pendingResults && isAuthenticated) {
      setPendingResults(false);
      setStep("results");
    }
  }, [pendingResults, isAuthenticated]);

  useEffect(() => {
    if (wasModalOpen.current && !isOpen && pendingResults && !isAuthenticated) {
      setPendingResults(false);
      setAuthPrompted(false);
      setStep("home");
      setEtape(null);
      setSeenIdeas([]);
    }
    wasModalOpen.current = isOpen;
  }, [isOpen, pendingResults, isAuthenticated]);

  useEffect(() => {
    if (step === "results") window.scrollTo(0, 0);
  }, [step, generatedIdeas]);

  const showResultsOrAskAccount = () => {
    if (!isAuthenticated && !authPrompted) {
      setAuthPrompted(true);
      openAuthModal("signup", "Crée ton compte pour voir tes idées");
      setPendingResults(true);
    } else {
      setStep("results");
    }
  };

  const handleGeneratePlan = async (selectedEtape: EtapeType, useSeenIdeas: boolean = true) => {
    setStep("generating");
    const currentSeen = useSeenIdeas === false ? [] : seenIdeas;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etape: selectedEtape, titreLivre: "", seenIdeas: currentSeen }),
      });
      if (!response.ok) throw new Error("Erreur de communication avec le serveur.");

      const data = await response.json();
      const newIdeas = data.ideas || [];
      setGeneratedIdeas(newIdeas);
      const newlySeen = newIdeas.map((item: any) => item.originalIdee);
      setSeenIdeas((prev) => {
        const base = data.hasReset ? [] : useSeenIdeas === false ? [] : prev;
        return Array.from(new Set([...base, ...newlySeen]));
      });
      showResultsOrAskAccount();
    } catch (err: any) {
      console.error(err);
      try {
        const { ideas } = await import("../data/ideas");
        const filtered = ideas.filter((item) => item.etapes.includes(selectedEtape));
        let remaining = filtered.filter((item) => !currentSeen.includes(item.idee));
        let resetHappened = false;
        if (remaining.length < 3) {
          remaining = filtered;
          resetHappened = true;
        }
        const selected = [...remaining].sort(() => 0.5 - Math.random()).slice(0, 3);
        const results = selected.map((item) => ({
          originalIdee: item.idee,
          idee: item.idee,
          accroche: item.accroche.replace(/\[titre du livre\]/gi, "ton roman"),
          structure: item.structure || [],
          pourquoi_ca_marche: item.pourquoi_ca_marche || "",
        }));
        setGeneratedIdeas(results);
        const newlySeen = results.map((item) => item.originalIdee);
        setSeenIdeas((prev) => {
          const base = resetHappened ? [] : useSeenIdeas === false ? [] : prev;
          return Array.from(new Set([...base, ...newlySeen]));
        });
        showResultsOrAskAccount();
      } catch {
        setStep("home");
      }
    }
  };

  /* ---------- Actions ---------- */
  const handleSelectEtape = (selectedEtape: EtapeType, x: number, y: number) => {
    setEtape(selectedEtape);
    setSeenIdeas([]);
    setAuthPrompted(false);
    closeOverlay(x, y);
    handleGeneratePlan(selectedEtape, false);
  };

  const handleBackToMuses = () => {
    setStep("home");
    setEtape(null);
    setSeenIdeas([]);
    closeOverlay();
  };

  const handleChangeStage = () => openOverlay("erato", window.innerWidth / 2, window.innerHeight / 2, false);

  const handleRegenerate = () => {
    if (etape) handleGeneratePlan(etape, true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {step === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <HomeScreen onInvoke={(muse, x, y) => openOverlay(muse, x, y, true)} />
          </motion.div>
        )}

        {step === "generating" && etape && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <GeneratingScreen etape={etape} />
          </motion.div>
        )}

        {step === "results" && etape && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ResultsScreen ideas={generatedIdeas} etape={etape} onChangeStage={handleChangeStage} onRegenerate={handleRegenerate} />
          </motion.div>
        )}
      </AnimatePresence>

      {overlay && (
        <InvocationScreen
          muse={overlay.muse}
          open={overlay.open}
          cx={overlay.cx}
          cy={overlay.cy}
          onSelectEtape={handleSelectEtape}
          onBackToMuses={handleBackToMuses}
        />
      )}
    </>
  );
}
