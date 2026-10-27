import { Link } from "react-router-dom";
import { Feather } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5]/80 border-t border-[#E8E1D5] py-8 text-center text-xs text-[#736B5E] relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-medium tracking-[0.15em] text-[#332D25] uppercase text-[11px]">
          © 2026 Muse Créative.
        </span>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
          <Link to="/mentions-legales" className="hover:text-[#8F7242] transition-colors cursor-pointer">
            Mentions légales
          </Link>
          <Link to="/politique-de-confidentialite" className="hover:text-[#8F7242] transition-colors cursor-pointer">
            Politique de confidentialité
          </Link>
          <span className="flex items-center gap-2 cursor-default">
            <Feather className="w-3.5 h-3.5 text-[#B89A62]" />
            <span className="italic font-serif text-[14px] text-[#4A433A]">Fait par une autrice, pour des autrices</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
