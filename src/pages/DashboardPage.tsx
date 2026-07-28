import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Heart, Bookmark, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToFavorites, FavoriteItem } from "../services/favoritesService";

export default function DashboardPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
        <h1 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#2d1b15] mb-6">
          Bonjour {profile?.prenom}
        </h1>

        {/* Navigation tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#F4C2C2]/30 pb-px">
          <button
            onClick={() => navigate("/")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all cursor-pointer ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] text-[#5c1d24] shadow-sm"
                : "text-[#605249] hover:text-[#D55C66] hover:bg-[#F4C2C2]/10"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Générer de nouvelles idées
          </button>
          <button
            onClick={() => navigate("/mes-favoris")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all cursor-pointer ${
              location.pathname === "/mes-favoris"
                ? "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] text-[#5c1d24] shadow-sm"
                : "text-[#605249] hover:text-[#D55C66] hover:bg-[#F4C2C2]/10"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Mes favoris
          </button>
          <button
            onClick={() => navigate("/parametres")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all cursor-pointer ${
              location.pathname === "/parametres"
                ? "bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] text-[#5c1d24] shadow-sm"
                : "text-[#605249] hover:text-[#D55C66] hover:bg-[#F4C2C2]/10"
            }`}
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </button>
        </div>

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

      </motion.div>
    </div>
  );
}
