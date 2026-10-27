import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Check, Mail, Compass } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface StrategyWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategyWaitlistModal({ isOpen, onClose }: StrategyWaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  // Pré-remplit l'email si l'autrice est connectée
  useEffect(() => {
    if (isOpen && !email && user?.email) setEmail(user.email);
  }, [isOpen, user?.email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Merci d'indiquer une adresse email valide.");
      return;
    }
    setError(null);
    setIsSending(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Une erreur est survenue, réessaie dans un instant.");
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue, réessaie dans un instant.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state slightly after close animation
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setError(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1A1715]/45 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E1D5] rounded-2xl shadow-[0_20px_50px_-10px_rgba(26,23,21,0.25)] p-7 sm:p-9 text-[#1A1715] z-10 overflow-hidden"
          >
            {/* Ancient Gold Top Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A876] to-transparent" />

            {/* Close Button */}
            <button
              id="close-strategy-modal-btn"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#736B5E] hover:text-[#1A1715] hover:bg-[#F5EFE4] transition-all cursor-pointer"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#F5EFE3] border border-[#D9CEBC] text-[#8F7242] px-3 py-1 rounded-full text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase shadow-3xs">
                <Compass className="w-3.5 h-3.5 text-[#B89A62]" />
                En cours de création
              </span>
            </div>

            {/* Modal Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1715] mb-3 leading-snug">
              Muse de la stratégie arrive bientôt
            </h3>

            {/* Explanatory Paragraph */}
            <p className="font-editorial text-base sm:text-[17px] text-[#5C5449] italic mb-6 leading-relaxed">
              Nous préparons activement des plans d'action, des tunnels de visibilité et des stratégies de lancement éprouvées pour faire connaître tes livres et propulser tes ventes.
            </p>

            {/* Form / Confirmation View */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#F5EFE4] border border-[#D9CEBC] rounded-xl p-6 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#EBF3ED] border border-[#B3D6BF] text-[#3D6E4E] mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#1A1715]">
                  Tu es sur la liste d'attente !
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5449] leading-relaxed">
                  Merci ! Tu recevras une invitation privilégiée en avant-première dès que la Muse de la stratégie ouvrira ses portes.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-[#FAF8F5] hover:bg-white text-[#1A1715] border border-[#D9CEBC] hover:border-[#B89A62] rounded-lg text-xs font-sans font-semibold tracking-[0.14em] uppercase transition-all cursor-pointer"
                >
                  Fermer
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="waitlist-email"
                    className="block text-xs font-sans font-semibold tracking-[0.14em] uppercase text-[#736B5E]"
                  >
                    Sois prévenue en priorité dès le lancement
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9E8052]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="ton.adresse.email@exemple.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#D9CEBC] focus:border-[#B89A62] focus:ring-2 focus:ring-[#B89A62]/20 rounded-xl text-sm text-[#1A1715] placeholder:text-[#9E9485] outline-none transition-all"
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-[#B34040] font-sans pt-1 pl-1">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    id="submit-waitlist-btn"
                    type="submit"
                    disabled={isSending}
                    className="disabled:opacity-60 disabled:cursor-wait flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1715] hover:bg-[#332D25] text-[#FAF8F5] rounded-xl text-xs font-sans font-semibold tracking-[0.14em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A876]" />
                    {isSending ? "Inscription en cours..." : "Rejoindre la liste d'attente"}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-3.5 bg-transparent hover:bg-[#F5EFE4] text-[#736B5E] hover:text-[#1A1715] border border-[#D9CEBC] rounded-xl text-xs font-sans font-semibold tracking-[0.14em] uppercase transition-all cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
