import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, User as UserIcon, LogOut, Settings, Bookmark, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";

export default function Header() {
  const { isAuthenticated, profile, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const handleMobileNavigate = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleMobileAuth = (mode: "login" | "signup") => {
    setMobileMenuOpen(false);
    openAuthModal(mode);
  };

  return (
    <header className="border-b border-[#F4C2C2]/40 bg-white/30 sticky top-0 z-50 shadow-[0_2px_12px_rgba(244,194,194,0.12)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-85 transition-opacity cursor-pointer text-left select-none gap-1.5 sm:gap-3 min-w-0"
        >
          <span className="font-serif-elegant text-base sm:text-2xl font-bold tracking-tight text-[#2d1b15] select-none pb-0.5 truncate">
            Muse Créative
          </span>
          <div className="w-7 h-6 sm:w-10 sm:h-8 relative rotate-[12deg] transform origin-center flex items-center justify-center -mt-1 shrink-0">
            <svg
              viewBox="0 0 120 90"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 12,28 C 30,22 45,26 60,30 C 75,26 90,22 108,28 L 104,74 C 88,68 73,72 60,76 C 47,72 32,68 16,74 Z"
                fill="#FFCAD4"
                stroke="#2d1b15"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 14,26 C 31,20 46,24 60,28 C 74,24 89,20 106,26 L 102,70 C 86,64 71,68 60,72 C 49,68 34,64 18,70 Z"
                fill="#FDE2E4"
                stroke="#2d1b15"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M 60,28 L 60,72" stroke="#2d1b15" strokeWidth="2" strokeLinecap="round" />
              <path d="M 18,71.5 C 34,65.5 49,69.5 60,73.5" stroke="#2d1b15" strokeWidth="1.2" />
              <path d="M 102,71.5 C 86,65.5 71,69.5 60,73.5" stroke="#2d1b15" strokeWidth="1.2" />
              <path d="M 18,73 C 34,67 49,71 60,75" stroke="#2d1b15" strokeWidth="1.2" />
              <path d="M 102,73 C 86,67 71,71 60,75" stroke="#2d1b15" strokeWidth="1.2" />
              <path
                d="M 82,53 C 82,53 76,47 76,43 C 76,39.5 79,37 82,39.5 C 85,37 88,39.5 88,43 C 88,47 82,53 82,53 Z"
                fill="#FFCAD4"
                stroke="#2d1b15"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>

        {/* Desktop (>= sm) : badge + boutons auth / menu user */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-[#605249]/80 tracking-wide">
          <span className="inline-flex items-center gap-1 bg-[#5c1d24]/10 border border-[#5c1d24]/20 text-[#5c1d24] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-3xs">
            <Heart className="w-2.5 h-2.5 fill-[#5c1d24] stroke-[#5c1d24]" />
            Romance Edition
          </span>

          {isAuthenticated ? (
            <>
              {isActive("/mes-favoris") ? null : (
                <button
                  onClick={() => navigate("/mes-favoris")}
                  className="hidden sm:inline-flex items-center gap-1.5 text-[#605249] hover:text-[#D55C66] transition-colors cursor-pointer text-xs font-semibold"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Mes favoris
                </button>
              )}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-1.5 bg-white/60 hover:bg-white border border-[#605249]/15 rounded-full pl-3 pr-2 py-1.5 text-xs font-semibold text-[#2c2520] transition-all cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#D55C66]" />
                  <span className="max-w-[80px] truncate">{profile?.prenom || "Mon compte"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#fffdfa] rounded-2xl shadow-xl border border-[#F4C2C2]/30 py-2 z-50">
                    <button
                      onClick={() => { navigate("/mon-espace"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#D55C66]" />
                      Mon espace
                    </button>
                    <button
                      onClick={() => { navigate("/mes-favoris"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <Bookmark className="w-4 h-4 text-[#D55C66]" />
                      Mes favoris
                    </button>
                    <button
                      onClick={() => { navigate("/parametres"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-[#D55C66]" />
                      Paramètres
                    </button>
                    <div className="h-px bg-[#605249]/10 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#D55C66] hover:bg-[#D55C66]/5 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal("login")}
                className="inline-flex items-center gap-1.5 bg-white/60 hover:bg-white border border-[#605249]/15 text-[#2c2520] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
              >
                Connexion
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 text-[#5c1d24] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>

        {/* Mobile (< sm) : badge compact + hamburger */}
        <div className="sm:hidden flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#5c1d24]/10 border border-[#5c1d24]/20 text-[#5c1d24] px-2 py-1 rounded-full text-[9px] uppercase font-bold tracking-wide shadow-3xs">
            <Heart className="w-2 h-2 fill-[#5c1d24] stroke-[#5c1d24]" />
            Romance
          </span>

          <div className="relative" ref={mobileMenuRef}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 hover:bg-white border border-[#605249]/15 text-[#2c2520] transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-[#fffdfa] rounded-2xl shadow-xl border border-[#F4C2C2]/30 py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 mb-1 border-b border-[#605249]/10">
                      <p className="text-[10px] uppercase tracking-wide text-[#605249]/60 font-semibold">Connecté</p>
                      <p className="text-sm text-[#2c2520] font-medium truncate">{profile?.prenom || "Mon compte"}</p>
                    </div>
                    <button
                      onClick={() => handleMobileNavigate("/mon-espace")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#D55C66]" />
                      Mon espace
                    </button>
                    <button
                      onClick={() => handleMobileNavigate("/mes-favoris")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <Bookmark className="w-4 h-4 text-[#D55C66]" />
                      Mes favoris
                    </button>
                    <button
                      onClick={() => handleMobileNavigate("/parametres")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#2c2520] hover:bg-[#F4C2C2]/10 transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-[#D55C66]" />
                      Paramètres
                    </button>
                    <div className="h-px bg-[#605249]/10 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#D55C66] hover:bg-[#D55C66]/5 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <div className="p-3 space-y-2">
                    <button
                      onClick={() => handleMobileAuth("login")}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-white/60 hover:bg-white border border-[#605249]/15 text-[#2c2520] px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => handleMobileAuth("signup")}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FFA3A5] to-[#FFD1B3] hover:opacity-95 text-[#5c1d24] px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer"
                    >
                      S'inscrire
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
