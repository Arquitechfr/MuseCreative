import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export type AuthModalMode = "login" | "signup" | "forgot-password";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthModalMode;
  onClose: () => void;
  title?: string;
}

function getFirebaseErrorMessage(error: any): string {
  const code = error?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "Cet email est déjà utilisé. Essaie de te connecter.";
    case "auth/invalid-email":
      return "L'adresse email n'est pas valide.";
    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères.";
    case "auth/user-not-found":
      return "Aucun compte trouvé avec cet email.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou mot de passe incorrect.";
    case "auth/too-many-requests":
      return "Trop de tentatives. Réessaie dans quelques minutes.";
    case "auth/popup-closed-by-user":
      return "La fenêtre Google a été fermée. Réessaie.";
    case "auth/network-request-failed":
      return "Problème de connexion. Vérifie ton internet.";
    default:
      return error?.message || "Une erreur est survenue. Réessaie.";
  }
}

export default function AuthModal({ isOpen, initialMode = "login", onClose, title }: AuthModalProps) {
  const { signUp, signIn, signInWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      resetForm();
    }
  }, [isOpen, initialMode]);

  const resetForm = () => {
    setPrenom("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setConsent(false);
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    setMode(initialMode);
    onClose();
  };

  const switchMode = (newMode: AuthModalMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Le mot de passe doit contenir au moins 6 caractères.");
          setLoading(false);
          return;
        }
        await signUp(email, password, prenom, consent);
        handleClose();
      } else if (mode === "login") {
        await signIn(email, password);
        handleClose();
      } else if (mode === "forgot-password") {
        await resetPassword(email);
        setSuccess("Un email de réinitialisation t'a été envoyé !");
        setLoading(false);
      }
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
      setLoading(false);
    } finally {
      if (mode !== "forgot-password") setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      handleClose();
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
      setLoading(false);
    }
  };

  const modalTitle = title || (mode === "signup" ? "Créer mon compte" : mode === "login" ? "Se connecter" : "Mot de passe oublié");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fffdfa] rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative border border-[#F4C2C2]/30"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#605249]/50 hover:text-[#D55C66] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif-elegant text-2xl font-bold text-[#2d1b15] mb-1">
                {modalTitle}
              </h2>
              {mode === "signup" && (
                <p className="text-sm text-[#605249]/70">Rejoins Muse Créative, c'est gratuit ✨</p>
              )}
              {mode === "login" && (
                <p className="text-sm text-[#605249]/70">Contente de te revoir !</p>
              )}
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-[#605249] mb-1.5 uppercase tracking-wide">Prénom</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#605249]/40" />
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      required
                      placeholder="Ton prénom"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#605249]/15 bg-[#faf8f5] text-sm text-[#2c2520] placeholder:text-[#605249]/40 focus:outline-none focus:border-[#D55C66]/50 focus:ring-2 focus:ring-[#D55C66]/10 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#605249] mb-1.5 uppercase tracking-wide">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#605249]/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ton@email.fr"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#605249]/15 bg-[#faf8f5] text-sm text-[#2c2520] placeholder:text-[#605249]/40 focus:outline-none focus:border-[#D55C66]/50 focus:ring-2 focus:ring-[#D55C66]/10 transition-all"
                  />
                </div>
              </div>

              {mode !== "forgot-password" && (
                <div>
                  <label className="block text-xs font-semibold text-[#605249] mb-1.5 uppercase tracking-wide">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#605249]/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#605249]/15 bg-[#faf8f5] text-sm text-[#2c2520] placeholder:text-[#605249]/40 focus:outline-none focus:border-[#D55C66]/50 focus:ring-2 focus:ring-[#D55C66]/10 transition-all"
                    />
                  </div>
                </div>
              )}

              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-[#605249] mb-1.5 uppercase tracking-wide">Confirmer le mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#605249]/40" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#605249]/15 bg-[#faf8f5] text-sm text-[#2c2520] placeholder:text-[#605249]/40 focus:outline-none focus:border-[#D55C66]/50 focus:ring-2 focus:ring-[#D55C66]/10 transition-all"
                    />
                  </div>
                </div>
              )}

              {mode === "signup" && (
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#605249]/30 text-[#D55C66] focus:ring-[#D55C66]/20 cursor-pointer"
                  />
                  <span className="text-xs text-[#605249] leading-relaxed group-hover:text-[#2c2520] transition-colors">
                    J'accepte de recevoir des emails de Muse Créative
                  </span>
                </label>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchMode("forgot-password")}
                    className="text-xs text-[#D55C66] hover:text-[#b33e48] font-medium transition-colors cursor-pointer"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 text-[#5c1d24] rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Patiente..." : mode === "signup" ? "Créer mon compte" : mode === "login" ? "Se connecter" : "Envoyer le lien"}
              </button>
            </form>

            {mode !== "forgot-password" && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-grow h-px bg-[#605249]/15" />
                  <span className="text-xs text-[#605249]/50 font-medium">ou</span>
                  <div className="flex-grow h-px bg-[#605249]/15" />
                </div>

                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full py-3.5 bg-white hover:bg-[#faf8f5] text-[#2c2520] border border-[#605249]/20 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continuer avec Google
                </button>
              </>
            )}

            <div className="text-center mt-5">
              {mode === "signup" && (
                <p className="text-sm text-[#605249]">
                  Déjà un compte ?{" "}
                  <button onClick={() => switchMode("login")} className="text-[#D55C66] hover:text-[#b33e48] font-semibold transition-colors cursor-pointer">
                    Se connecter
                  </button>
                </p>
              )}
              {mode === "login" && (
                <p className="text-sm text-[#605249]">
                  Pas encore de compte ?{" "}
                  <button onClick={() => switchMode("signup")} className="text-[#D55C66] hover:text-[#b33e48] font-semibold transition-colors cursor-pointer">
                    S'inscrire
                  </button>
                </p>
              )}
              {mode === "forgot-password" && (
                <p className="text-sm text-[#605249]">
                  <button onClick={() => switchMode("login")} className="text-[#D55C66] hover:text-[#b33e48] font-semibold transition-colors cursor-pointer">
                    ← Retour à la connexion
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
