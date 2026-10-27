import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User as UserIcon, LogOut, Settings, Bookmark, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";

const menuItem =
  "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1715] hover:bg-[#F5EFE4] transition-colors cursor-pointer text-left";

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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const go = (path: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    go("/");
  };

  const accountLinks = (
    <>
      <button onClick={() => go("/mon-espace")} className={menuItem}>
        <UserIcon className="w-4 h-4 text-[#8F7242]" />
        Mon espace
      </button>
      <button onClick={() => go("/mes-favoris")} className={menuItem}>
        <Bookmark className="w-4 h-4 text-[#8F7242]" />
        Mes favoris
      </button>
      <button onClick={() => go("/parametres")} className={menuItem}>
        <Settings className="w-4 h-4 text-[#8F7242]" />
        Paramètres
      </button>
      <div className="h-px bg-[#E8E1D5] my-1" />
      <button onClick={handleSignOut} className={`${menuItem} !text-[#8F7242]`}>
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </>
  );

  return (
    <header className="site-header">
      <span aria-hidden="true" />

      <button onClick={() => go("/")} className="brand cursor-pointer select-none" title="Retour à l'accueil">
        <span className="brand-name">Muse Créative</span>
      </button>

      {/* Ordinateur : boutons de compte */}
      <div className="auth !hidden sm:!flex">
        {isAuthenticated ? (
          <>
            {location.pathname !== "/mes-favoris" && (
              <button onClick={() => go("/mes-favoris")} className="auth-btn">
                Mes favoris
              </button>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="auth-btn inline-flex items-center gap-1.5"
                aria-expanded={dropdownOpen}
              >
                <span className="max-w-[90px] truncate">{profile?.prenom || "Mon compte"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#E8E1D5] py-2 z-50">
                  {accountLinks}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => openAuthModal("login")} className="auth-btn">
              Connexion
            </button>
            <button onClick={() => openAuthModal("signup")} className="auth-btn primary">
              S'inscrire
            </button>
          </>
        )}
      </div>

      {/* Téléphone : menu */}
      <div className="sm:hidden justify-self-end relative" ref={mobileMenuRef}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 border border-[#5C5449]/15 text-[#1A1715] cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        {mobileMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-60 bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#E8E1D5] py-2 z-50">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 mb-1 border-b border-[#E8E1D5]">
                  <p className="text-[10px] uppercase tracking-wide text-[#736B5E] font-semibold">Connectée</p>
                  <p className="text-sm text-[#1A1715] font-medium truncate">{profile?.prenom || "Mon compte"}</p>
                </div>
                {accountLinks}
              </>
            ) : (
              <div className="p-3 grid gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="auth-btn !py-2.5"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signup");
                  }}
                  className="auth-btn primary !py-2.5"
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
