# Muse Créative

App React 19 + Vite (front) servie par un serveur Express (`server.ts`) qui expose aussi l'API (`/api/health`, `/api/generate`, `/api/feedback`, `/api/waitlist`). Firebase côté client, Brevo côté serveur.

## Commandes de dev

Gestionnaire de paquets : **pnpm** uniquement.

```bash
pnpm install         # dépendances (met à jour pnpm-lock.yaml)
pnpm dev             # serveur Express + Vite en middleware (tsx server.ts), port 9102 par défaut
pnpm lint            # vérification des types (tsc --noEmit)
pnpm build           # vite build + bundle esbuild du serveur → dist/server.cjs
pnpm start           # lance le build de prod en local (node dist/server.cjs)
```

Variables d'environnement locales : copier `.env.example` en `.env` (jamais commité).

## Déploiement

Depuis le 29/10/2026, la production est déployée par **Dokploy** (self-hosted sur le serveur ArquiTech), connecté à GitHub.

- **Chaque push sur `main` déclenche un build + déploiement en production** (musecreative.fr et www.musecreative.fr). Il n'y a pas de préproduction : tout ce qui arrive sur `main` part en prod, y compris un changement de doc. Travailler sur une branche (`feat/`, `fix/`, `refactor/`) et fusionner quand c'est prêt.
- **Build (Railpack)** : Node 22.
  - installation : `npx -y pnpm@12.11.2 install --frozen-lockfile`
  - build : `npx -y pnpm@12.11.2 run build`
  - démarrage : `node dist/server.cjs`, `PORT=9102`
- `pnpm-lock.yaml` doit toujours être commité et à jour (sinon `--frozen-lockfile` fait échouer le build).
- Ne pas ajouter de champ `packageManager` ou `engines` dans `package.json` sans le signaler : les commandes Dokploy sont figées sur pnpm 12.11.2.
- **Variables d'environnement de prod** : gérées dans Dokploy (onglet *Environment* de l'app « musecreative »), pas dans un `.env` sur le serveur. Les `VITE_*` (ex. `VITE_FIREBASE_*`) sont injectées **au build** : toute nouvelle variable `VITE_*` doit être ajoutée dans Dokploy **avant** le push qui l'utilise.
- **Health check** : Dokploy vérifie `GET /api/health` (doit répondre 200). Ne pas supprimer cette route ni la rendre dépendante d'un service externe (Firebase, Brevo…).
- **Sans coupure** : la nouvelle version démarre, doit être saine, puis remplace l'ancienne ; en cas d'échec, l'ancienne reste en ligne. Les deux versions coexistent quelques secondes : éviter tout traitement au démarrage qui suppose une instance unique.
- **Interdit** : FTP, SSH, `pm2 start` / `pm2 reload`, archives de déploiement.

## Typographie

- Jamais de tiret cadratin (U+2014), de barre horizontale (U+2015) ni de demi-cadratin entouré d'espaces (U+2013) dans le code, les commentaires, la doc, les textes d'UI, les messages de commit et de PR. Selon le rôle du tiret : virgules, deux-points, parenthèses ou deux phrases. Ne pas le remplacer par un trait d'union entouré d'espaces : reformuler. Plages numériques : `10-20` ou « de 10 à 20 ».
- Les tirets déjà présents ne bloquent pas : les corriger seulement dans les lignes déjà modifiées.
- `.slopguardrc.json` configure le scanner et les hooks anti-slop pour ce dépôt (chemins ignorés, règles coupées).
