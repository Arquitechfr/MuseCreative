import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Copy, Check, Download, Heart, Bookmark } from "lucide-react";
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

  const handleExport = () => {
    let text = `==================================================\n`;
    text += `📚 MES FAVORIS - MUSE CRÉATIVE\n`;
    text += `==================================================\n\n`;

    favorites.forEach((fav, index) => {
      text += `💡 IDÉE ${index + 1} : ${fav.idee}\n`;
      text += `Étape : ${fav.etape}\n`;
      text += `✍️ Accroche :\n${fav.accroche}\n\n`;
      if (fav.structure && fav.structure.length > 0) {
        text += `📋 Structure :\n`;
        fav.structure.forEach((step, i) => {
          text += `  ${i + 1}. ${step}\n`;
        });
        text += `\n`;
      }
      if (fav.pourquoi_ca_marche) {
        text += `🎯 Pourquoi ça marche :\n${fav.pourquoi_ca_marche}\n`;
      }
      text += `\n--------------------------------------------------\n\n`;
    });

    text += `Exporté depuis Muse Créative ✨`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mes_favoris_muse_creative.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#D55C66]/30 border-t-[#D55C66] rounded-full animate-spin" />
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
            <h1 className="font-serif-elegant text-3xl sm:text-4xl font-bold text-[#2d1b15] mb-1">
              Mes favoris
            </h1>
            <p className="text-sm text-[#605249]">
              {favorites.length > 0
                ? `${favorites.length} idée${favorites.length > 1 ? "s" : ""} sauvegardée${favorites.length > 1 ? "s" : ""}`
                : "Aucune idée en favoris pour le moment"}
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#faf8f5] text-[#605249] border border-[#605249]/20 rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Exporter en .txt
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#D55C66]/10 flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-[#D55C66]/40" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-2">
              Tu n'as pas encore d'idées en favoris
            </h2>
            <p className="text-sm text-[#605249] max-w-md">
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
                className="bg-white rounded-2xl border border-[#D55C66]/20 shadow-sm p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#D55C66] to-[#FBC8A6]" />

                <div className="pl-2">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-grow">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-[#D55C66] bg-[#D55C66]/10 px-2 py-0.5 rounded-full mb-2">
                        {fav.etape}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#2c2520] group-hover:text-[#D55C66] transition-colors">
                        {fav.idee}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(fav)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          copiedId === fav.id
                            ? "bg-[#b33e48] text-white"
                            : "bg-[#faf8f5] text-[#D55C66] border border-[#D55C66]/25 hover:bg-[#D55C66]/5"
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
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#D55C66]/10 text-[#D55C66] border border-[#D55C66]/20 hover:bg-[#D55C66]/15 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Heart className="w-4 h-4 fill-[#D55C66]" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#faf8f5] rounded-xl border border-[#605249]/5 p-4 text-sm text-[#2c2520] leading-relaxed italic font-serif mb-3">
                    {fav.accroche}
                  </div>

                  {fav.structure && fav.structure.length > 0 && (
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#605249]/50 block mb-1.5">
                        Structure :
                      </span>
                      <ol className="list-none space-y-1.5">
                        {fav.structure.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#605249]">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D55C66]/10 text-[#D55C66] font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {fav.pourquoi_ca_marche && (
                    <div className="bg-[#FBC8A6]/15 border-l-2 border-[#FBC8A6] px-3.5 py-2.5 rounded-r-xl text-xs text-[#605249] leading-relaxed italic">
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
