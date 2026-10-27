import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="foot-brand">© 2026 Muse Créative.</span>
      <nav className="foot-links" aria-label="Liens légaux">
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
        <span className="foot-sign">Fait par une autrice, pour les auteurs</span>
      </nav>
    </footer>
  );
}
