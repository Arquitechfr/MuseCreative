import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white/5 border-t border-[#F4C2C2]/40 py-8 text-center text-xs text-[#2d1b15]/70 relative z-10 shadow-[0_-4px_16px_rgba(244,194,194,0.1)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Muse Créative.</p>
        <div className="flex gap-4 items-center">
          <Link to="/mentions-legales" className="hover:text-[#D55C66] transition-colors cursor-pointer">
            Mentions légales
          </Link>
          <Link to="/politique-de-confidentialite" className="hover:text-[#D55C66] transition-colors cursor-pointer">
            Politique de confidentialité
          </Link>
          <span className="hover:text-[#F4C2C2] transition-colors cursor-default hidden sm:inline">
            Fait par une autrice, pour des autrices
          </span>
        </div>
      </div>
    </footer>
  );
}
