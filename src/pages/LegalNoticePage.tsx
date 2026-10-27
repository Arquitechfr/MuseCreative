export default function LegalNoticePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white/70 rounded-2xl border border-[#D9CEBC]/30 p-6 sm:p-10 shadow-sm">
        <h1 className="font-serif text-3xl font-medium text-[#1A1715] mb-8">
          Mentions légales
        </h1>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-3">
            Éditeur du site
          </h2>
          <p className="text-sm text-[#5C5449] leading-relaxed mb-2">
            Le site "Muse Créative" est édité par :
          </p>
          <ul className="text-sm text-[#5C5449] leading-relaxed space-y-1 ml-4">
            <li><strong>Raison sociale</strong> : Moonheaven Lab</li>
            <li><strong>Statut</strong> : Micro entreprise</li>
            <li><strong>Numéro SIRET</strong> : 51404668900030</li>
            <li><strong>Adresse</strong> : Eugène Tenot 65000 Tarbes</li>
            <li><strong>Email de contact</strong> : contact@musecreative.fr</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-3">
            Directeur de la publication
          </h2>
          <p className="text-sm text-[#5C5449] leading-relaxed">
            Crespo Jessica
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-3">
            Hébergement
          </h2>
          <ul className="text-sm text-[#5C5449] leading-relaxed space-y-1 ml-4">
            <li><strong>Nom de l'hébergeur</strong> : —</li>
            <li><strong>Adresse</strong> : —</li>
            <li><strong>Contact</strong> : —</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-3">
            Propriété intellectuelle
          </h2>
          <p className="text-sm text-[#5C5449] leading-relaxed">
            L'ensemble des contenus présents sur le site Muse Créative (textes, structure, base d'idées, design)
            est la propriété de Moonheaven Lab, sauf mention contraire. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-3">
            Contact
          </h2>
          <p className="text-sm text-[#5C5449] leading-relaxed">
            Pour toute question relative à ce site, tu peux nous contacter à l'adresse :{" "}
            <a href="mailto:contact@musecreative.fr" className="text-[#8F7242] hover:text-[#6E5429] font-medium">
              contact@musecreative.fr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
