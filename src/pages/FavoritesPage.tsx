import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Copy, Check, Heart, Bookmark } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToFavorites, removeFavorite, FavoriteItem } from "../services/favoritesService";

export default function FavoritesPage() {
  const { profile } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile?.uid) return;
    const unsub = subscribeToFavorites(profile.uid, (favs) => {
      setFavorites(favs);
      setLoading(false);
    });
    return () => unsub();
  }, [profile?.uid]);

  const handleCopy = (fav: FavoriteItem) => {
    const stepsText = fav.structure && fav.structure.length > 0
      ? fav.structure.map((s, i) => `  ${i + 1}. ${s}`).join("\n")
      : "";
    const text = `Titre : ${fav.idee}\n\nAngle & Accroche :\n${fav.accroche}\n\nComment structurer ton post :\n${stepsText}\n\nPourquoi ça marche :\n${fav.pourquoi_ca_marche}`;
    navigator.clipboard.writeText(text);
    setCopiedId(fav.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleRemove = async (favId: string) => {
    if (!profile?.uid) return;
    setRemovingId(favId);
    try {
      await removeFavorite(profile.uid, favId);
    } catch (err) {
      console.error("Remove favorite error:", err);
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#8F7242]/30 border-t-[#8F7242] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715] mb-1">
              Mes favoris
            </h1>
            <p className="text-sm text-[#5C5449]">
              {favorites.length > 0
                ? `${favorites.length} idée${favorites.length > 1 ? "s" : ""} sauvegardée${favorites.length > 1 ? "s" : ""}`
                : "Aucune idée en favoris pour le moment"}
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#8F7242]/10 flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-[#8F7242]/40" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-2">
              Tu n'as pas encore d'idées en favoris
            </h2>
            <p className="text-sm text-[#5C5449] max-w-md">
              Génère des idées de contenu et clique sur le cœur ❤️ pour les sauvegarder ici.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((fav, index) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-[#8F7242]/20 shadow-sm p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#C5A876] to-[#E8E1D5]" />

                <div className="pl-2">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-grow">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-[#8F7242] bg-[#8F7242]/10 px-2 py-0.5 rounded-full mb-2">
                        {fav.etape}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#1A1715] group-hover:text-[#8F7242] transition-colors">
                        {fav.idee}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(fav)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          copiedId === fav.id
                            ? "bg-[#6E5429] text-white"
                            : "bg-[#faf8f5] text-[#8F7242] border border-[#8F7242]/25 hover:bg-[#8F7242]/5"
                        }`}
                      >
                        {copiedId === fav.id ? (
                          <><Check className="w-3.5 h-3.5" /> Copié</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copier</>
                        )}
                      </button>
                      <button
                        onClick={() => handleRemove(fav.id)}
                        disabled={removingId === fav.id}
                        title="Retirer des favoris"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#8F7242]/10 text-[#8F7242] border border-[#8F7242]/20 hover:bg-[#8F7242]/15 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Heart className="w-4 h-4 fill-[#8F7242]" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] rounded-xl border border-[#5C5449]/5 p-4 text-sm text-[#1A1715] leading-relaxed italic font-serif mb-3">
                    {fav.accroche}
                  </div>

                  {fav.structure && fav.structure.length > 0 && (
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C5449]/50 block mb-1.5">
                        Structure :
                      </span>
                      <ol className="list-none space-y-1.5">
                        {fav.structure.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#5C5449]">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8F7242]/10 text-[#8F7242] font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {fav.pourquoi_ca_marche && (
                    <div className="bg-[#FAF8F5] border-l-2 border-[#B89A62] px-3.5 py-2.5 rounded-r-xl text-xs text-[#5C5449] leading-relaxed italic">
                      {fav.pourquoi_ca_marche}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
