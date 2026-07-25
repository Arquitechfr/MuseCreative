import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Heart, Bookmark, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToFavorites, FavoriteItem } from "../services/favoritesService";

export default function DashboardPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.uid) return;
    const unsub = subscribeToFavorites(profile.uid, (favs) => {
      setFavorites(favs);
      setLoading(false);
    });
    return () => unsub();
  }, [profile?.uid]);

  const recentFavorites = favorites.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#2d1b15] mb-2">
          Bonjour {profile?.prenom} ✨
        </h1>
        <p className="text-sm text-[#605249] mb-8">
          Contente de te revoir dans ton espace créatif.
        </p>

        {/* Stats card */}
        <div className="bg-white/70 rounded-2xl border border-[#F4C2C2]/30 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D55C66]/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#D55C66] fill-[#D55C66]/30" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2c2520]">
                {loading ? "…" : favorites.length}
              </p>
              <p className="text-sm text-[#605249]">
                {favorites.length > 1 ? "idées en favoris" : "idée en favoris"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent favorites preview */}
        {recentFavorites.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-[#2c2520]">
                Tes favoris récents
              </h2>
              <Link
                to="/mes-favoris"
                className="text-sm text-[#D55C66] hover:text-[#b33e48] font-semibold transition-colors"
              >
                Voir tous mes favoris →
              </Link>
            </div>
            <div className="space-y-3">
              {recentFavorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-white/70 rounded-xl border border-[#F4C2C2]/20 p-4 hover:shadow-sm transition-all"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-[#D55C66] bg-[#D55C66]/10 px-2 py-0.5 rounded-full mb-2">
                    {fav.etape}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#2c2520] mb-1">
                    {fav.idee}
                  </h3>
                  <p className="text-sm text-[#605249] line-clamp-2 italic font-serif">
                    {fav.accroche}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center gap-3 bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 text-[#5c1d24] rounded-2xl p-6 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-7 h-7" />
            <span className="font-bold text-sm">Générer de nouvelles idées</span>
          </button>

          <Link
            to="/mes-favoris"
            className="flex flex-col items-center gap-3 bg-white/70 hover:bg-white border border-[#F4C2C2]/30 text-[#2c2520] rounded-2xl p-6 transition-all shadow-sm hover:scale-[1.02]"
          >
            <Bookmark className="w-7 h-7 text-[#D55C66]" />
            <span className="font-bold text-sm">Mes favoris</span>
          </Link>

          <Link
            to="/parametres"
            className="flex flex-col items-center gap-3 bg-white/70 hover:bg-white border border-[#F4C2C2]/30 text-[#2c2520] rounded-2xl p-6 transition-all shadow-sm hover:scale-[1.02]"
          >
            <Settings className="w-7 h-7 text-[#D55C66]" />
            <span className="font-bold text-sm">Paramètres</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
