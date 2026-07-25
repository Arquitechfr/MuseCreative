export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white/70 rounded-2xl border border-[#F4C2C2]/30 p-6 sm:p-10 shadow-sm">
        <h1 className="font-serif-elegant text-3xl font-bold text-[#2d1b15] mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-xs text-[#605249]/60 mb-8">
          Dernière mise à jour : 23/07/2026
        </p>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Qui sommes-nous</h2>
          <p className="text-sm text-[#605249] leading-relaxed">
            Muse Créative est un outil édité par Moonheaven Lab, accessible à l'adresse :{" "}
            <a href="https://musecreative.fr/" className="text-[#D55C66] hover:text-[#b33e48] font-medium">
              https://musecreative.fr/
            </a>.
          </p>
          <p className="text-sm text-[#605249] leading-relaxed mt-2">
            Pour toute question sur cette politique ou sur tes données, contacte-nous à :{" "}
            <a href="mailto:contact@musecreative.fr" className="text-[#D55C66] hover:text-[#b33e48] font-medium">
              contact@musecreative.fr
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Quelles données nous collectons</h2>
          <p className="text-sm text-[#605249] leading-relaxed mb-2">
            Lorsque tu crées un compte sur Muse Créative, nous collectons :
          </p>
          <ul className="text-sm text-[#605249] leading-relaxed space-y-1 ml-4 list-disc">
            <li>Ton <strong>prénom</strong></li>
            <li>Ton <strong>adresse email</strong></li>
            <li>Ton <strong>mot de passe</strong> (stocké de façon sécurisée et chiffrée), si tu utilises l'inscription classique</li>
            <li>Si tu utilises la connexion via Google, certaines informations transmises par Google (nom, email) dans le cadre de l'authentification</li>
            <li>Les <strong>idées de contenu que tu ajoutes à tes favoris</strong></li>
            <li>Ton <strong>consentement (ou non)</strong> à recevoir des emails de Muse Créative</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Pourquoi nous collectons ces données</h2>
          <ul className="text-sm text-[#605249] leading-relaxed space-y-1 ml-4 list-disc">
            <li>Pour te permettre de créer et gérer ton compte</li>
            <li>Pour sauvegarder tes idées favorites d'une session à l'autre</li>
            <li>Pour t'envoyer des emails (actualités, nouvelles fonctionnalités) <strong>uniquement si tu as coché la case de consentement</strong> lors de ton inscription</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Avec qui nous partageons tes données</h2>
          <p className="text-sm text-[#605249] leading-relaxed mb-2">
            Nous ne vendons ni ne partageons tes données avec des tiers à des fins commerciales.
            Certaines données transitent par des prestataires techniques :
          </p>
          <ul className="text-sm text-[#605249] leading-relaxed space-y-1 ml-4 list-disc">
            <li><strong>Google</strong>, si tu utilises la connexion via Google (authentification)</li>
            <li><strong>Mailerlite</strong>, notre prestataire d'emailing, si tu as consenti à recevoir nos emails</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Combien de temps nous conservons tes données</h2>
          <p className="text-sm text-[#605249] leading-relaxed">
            Tes données sont conservées tant que ton compte est actif. Tu peux demander la suppression
            de ton compte et de tes données à tout moment (voir ci-dessous).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Tes droits</h2>
          <p className="text-sm text-[#605249] leading-relaxed mb-2">
            Conformément au RGPD, tu disposes des droits suivants sur tes données :
          </p>
          <ul className="text-sm text-[#605249] leading-relaxed space-y-1 ml-4 list-disc">
            <li><strong>Droit d'accès</strong> : savoir quelles données nous détenons sur toi</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de ton compte et de tes données, directement via le bouton "Supprimer mon compte" dans tes paramètres, ou en nous contactant à contact@musecreative.fr</li>
            <li><strong>Droit de retrait du consentement</strong> : te désinscrire de nos emails à tout moment (lien de désinscription présent dans chaque email)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Cookies</h2>
          <p className="text-sm text-[#605249] leading-relaxed">
            Le site utilise un cookie technique nécessaire pour te garder connectée à ton compte.
            Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-[#2c2520] mb-3">Contact</h2>
          <p className="text-sm text-[#605249] leading-relaxed">
            Pour toute question ou pour exercer tes droits, contacte-nous à :{" "}
            <a href="mailto:contact@musecreative.fr" className="text-[#D55C66] hover:text-[#b33e48] font-medium">
              contact@musecreative.fr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
