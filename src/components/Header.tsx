import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User as UserIcon, LogOut, Settings, Bookmark, ChevronDown, Menu, X } from "lucide-react";
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
    <header className="border-b border-[#E8E1D5] bg-[#FAF8F5]/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-2">
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-90 transition-all cursor-pointer text-left select-none gap-2.5 sm:gap-3.5 group min-w-0"
          title="Retour à l'accueil"
        >
          {/* Sceau / plume de la Muse */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5EFE4] border border-[#D9CEBC] flex items-center justify-center shadow-xs group-hover:border-[#B89A62] transition-colors shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#8F7242]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <line x1="16" y1="8" x2="2" y2="22" />
              <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="font-display text-[15px] sm:text-xl font-semibold tracking-[0.16em] sm:tracking-[0.18em] text-[#1A1715] block uppercase truncate">
              Muse Créative
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.25em] uppercase font-sans font-medium text-[#8F7242] block">
              Romance Edition
            </span>
          </div>
        </button>

        {/* Desktop (>= sm) : badge + boutons auth / menu user */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-[#5C5449]/80 tracking-wide">

          {isAuthenticated ? (
            <>
              {isActive("/mes-favoris") ? null : (
                <button
                  onClick={() => navigate("/mes-favoris")}
                  className="hidden sm:inline-flex items-center gap-1.5 text-[#5C5449] hover:text-[#8F7242] transition-colors cursor-pointer text-xs font-semibold"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Mes favoris
                </button>
              )}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-1.5 bg-white/60 hover:bg-white border border-[#5C5449]/15 rounded-full pl-3 pr-2 py-1.5 text-xs font-semibold text-[#1A1715] transition-all cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#8F7242]" />
                  <span className="max-w-[80px] truncate">{profile?.prenom || "Mon compte"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#E8E1D5] py-2 z-50">
                    <button
                      onClick={() => { navigate("/mon-espace"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#8F7242]" />
                      Mon espace
                    </button>
                    <button
                      onClick={() => { navigate("/mes-favoris"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <Bookmark className="w-4 h-4 text-[#8F7242]" />
                      Mes favoris
                    </button>
                    <button
                      onClick={() => { navigate("/parametres"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-[#8F7242]" />
                      Paramètres
                    </button>
                    <div className="h-px bg-[#5C5449]/10 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#8F7242] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
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
                className="inline-flex items-center gap-1.5 bg-white/60 hover:bg-white border border-[#5C5449]/15 text-[#1A1715] px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer"
              >
                Connexion
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center gap-1.5 bg-[#1A1715] hover:bg-[#332D25] text-[#FAF8F5] px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all shadow-sm cursor-pointer"
              >
                S'inscrire
              </button>
            </div>
          )}
        </div>

        {/* Mobile (< sm) : badge compact + hamburger */}
        <div className="sm:hidden flex items-center gap-2">

          <div className="relative" ref={mobileMenuRef}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 hover:bg-white border border-[#5C5449]/15 text-[#1A1715] transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#E8E1D5] py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 mb-1 border-b border-[#5C5449]/10">
                      <p className="text-[10px] uppercase tracking-wide text-[#5C5449]/60 font-semibold">Connecté</p>
                      <p className="text-sm text-[#1A1715] font-medium truncate">{profile?.prenom || "Mon compte"}</p>
                    </div>
                    <button
                      onClick={() => handleMobileNavigate("/mon-espace")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#8F7242]" />
                      Mon espace
                    </button>
                    <button
                      onClick={() => handleMobileNavigate("/mes-favoris")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <Bookmark className="w-4 h-4 text-[#8F7242]" />
                      Mes favoris
                    </button>
                    <button
                      onClick={() => handleMobileNavigate("/parametres")}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-4 h-4 text-[#8F7242]" />
                      Paramètres
                    </button>
                    <div className="h-px bg-[#5C5449]/10 my-1" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#8F7242] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <div className="p-3 space-y-2">
                    <button
                      onClick={() => handleMobileAuth("login")}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-white/60 hover:bg-white border border-[#5C5449]/15 text-[#1A1715] px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-[0.12em] uppercase transition-all cursor-pointer"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => handleMobileAuth("signup")}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1A1715] hover:bg-[#332D25] text-[#FAF8F5] px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-[0.12em] uppercase transition-all shadow-sm cursor-pointer"
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
