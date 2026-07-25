import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { User as UserIcon, Mail, Trash2, AlertTriangle, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsPage() {
  const { profile, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await deleteAccount();
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue lors de la suppression.");
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#2d1b15] mb-8">
          Paramètres
        </h1>

        {/* Account info */}
        <div className="bg-white/70 rounded-2xl border border-[#F4C2C2]/30 p-6 mb-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#2c2520] mb-4">
            Informations du compte
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D55C66]/10 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 text-[#D55C66]" />
              </div>
              <div>
                <p className="text-xs text-[#605249]/60 uppercase tracking-wide font-semibold">Prénom</p>
                <p className="text-sm text-[#2c2520] font-medium">{profile?.prenom || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D55C66]/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#D55C66]" />
              </div>
              <div>
                <p className="text-xs text-[#605249]/60 uppercase tracking-wide font-semibold">Email</p>
                <p className="text-sm text-[#2c2520] font-medium">{profile?.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D55C66]/10 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 text-[#D55C66]" />
              </div>
              <div>
                <p className="text-xs text-[#605249]/60 uppercase tracking-wide font-semibold">Méthode de connexion</p>
                <p className="text-sm text-[#2c2520] font-medium">
                  {profile?.provider === "google" ? "Google" : "Email & mot de passe"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-red-50/50 rounded-2xl border border-red-200/50 p-6">
          <h2 className="font-serif text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Zone de danger
          </h2>
          <p className="text-sm text-red-700/80 mb-4">
            La suppression de ton compte est définitive. Toutes tes données (profil, favoris) seront effacées.
            Cette action est irréversible, conformément au RGPD.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer mon compte
          </button>
        </div>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffdfa] rounded-3xl shadow-2xl w-full max-w-md p-6 relative border border-red-200/30"
            >
              <button
                onClick={() => !deleting && setShowDeleteConfirm(false)}
                className="absolute top-4 right-4 text-[#605249]/50 hover:text-[#D55C66] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-serif-elegant text-xl font-bold text-[#2d1b15] mb-2">
                  Supprimer définitivement ?
                </h3>
                <p className="text-sm text-[#605249]">
                  Ton compte, tes favoris et toutes tes données seront supprimés pour toujours.
                  Cette action est <strong>irréversible</strong>.
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="flex-1 py-3 bg-[#faf8f5] hover:bg-white text-[#2c2520] border border-[#605249]/20 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  {deleting ? "Suppression..." : "Oui, supprimer"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
