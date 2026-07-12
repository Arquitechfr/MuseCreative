export interface Idea {
  idee: string;
  accroche: string;
  etapes: ("Manuscrit en cours d'écriture" | "Pré-lancement" | "Livre sorti")[];
  structure: string[];
  pourquoi_ca_marche: string;
}

export const ideas: Idea[] = [
  {
    "idee": "Ton parcours d'auteur",
    "accroche": "Qu'est-ce qui t'a donné envie d'écrire ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Raconte le moment ou déclic précis qui t'a lancée dans l'écriture",
      "Fais le lien avec qui tu es aujourd'hui en tant qu'autrice",
      "Termine par une question à tes abonnées sur leur propre déclic"
    ],
    "pourquoi_ca_marche": "Une histoire personnelle crée de la connexion immédiate et donne un visage humain derrière le livre."
  },
  {
    "idee": "Parle du genre que tu écris",
    "accroche": "Qu'est-ce que tu aimes dans ce genre, qu'est-ce que tu n'aimes pas ? Tes livres préférés ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Nomme ton genre et ce qui te fait vibrer dedans",
      "Cite 2-3 exemples de livres qui t'ont marquée dans ce genre",
      "Invite tes abonnées à partager leurs propres coups de cœur du genre"
    ],
    "pourquoi_ca_marche": "Ça permet à ta communauté de se reconnaître dans tes goûts et de se sentir entre lectrices similaires."
  },
  {
    "idee": "Partage tes tropes préférés",
    "accroche": "Liste tes tropes préférés et explique pourquoi tu les aimes",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Liste 3 à 5 tropes que tu adores",
      "Explique en une phrase pourquoi chacun te fait vibrer",
      "Demande à tes abonnées lesquels sont leurs préférés"
    ],
    "pourquoi_ca_marche": "Les tropes sont un langage commun entre autrices et lectrices romance, ça crée un sentiment d'appartenance immédiat."
  },
  {
    "idee": "Partage tes valeurs, ta mission en tant qu'autrice",
    "accroche": "Quelles sont tes non-négociables ? Ce que tu n'écriras jamais ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Énonce clairement 1-2 valeurs ou lignes rouges qui te définissent",
      "Explique pourquoi c'est important pour toi en tant qu'autrice",
      "Invite à la discussion sur ce qui compte pour elles en tant que lectrices"
    ],
    "pourquoi_ca_marche": "Prendre position renforce ta crédibilité et attire les lectrices qui partagent vraiment ta vision."
  },
  {
    "idee": "Les tropes ou éléments que tu n'écriras jamais",
    "accroche": "Si tu as des choses sur lesquelles tu refuses d'écrire, partage-les.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Nomme ce que tu refuses catégoriquement d'écrire",
      "Explique brièvement pourquoi c'est une ligne rouge pour toi",
      "Termine sur ce que tu proposes à la place"
    ],
    "pourquoi_ca_marche": "Ça rassure certaines lectrices sur le contenu du livre et affirme ton identity d'autrice."
  },
  {
    "idee": "Partage des moodboards de la vibe de ton manuscrit",
    "accroche": "La vibe de ton manuscrit commence à se dessiner ? Partage le moodboard et tease l'ambiance.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement"
    ],
    "structure": [
      "Partage 3-4 visuels qui résument l'ambiance de ton histoire",
      "Ajoute une légende sur ce que chaque image évoque",
      "Demande ce que cette ambiance leur inspire"
    ],
    "pourquoi_ca_marche": "Le visuel capte l'attention plus vite qu'un texte et permet de teaser sans rien dévoiler du scénario."
  },
  {
    "idee": "Partage ton processus d'écriture",
    "accroche": "Tu planifies tout à l'avance ou tu improvises ? Comment tu construis tes scènes, tes actes, tes personnages ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Décris ta méthode (plan détaillé ou improvisation)",
      "Donne un exemple concret sur ce manuscrit",
      "Demande à tes abonnées autrices comment elles fonctionnent"
    ],
    "pourquoi_ca_marche": "Montrer les coulisses humanise ton travail et intéresse particulièrement les abonnées qui écrivent elles-mêmes."
  },
  {
    "idee": "Partage qui tu es",
    "accroche": "Présente quelques facts sur toi.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Liste 3-5 facts personnels marquants",
      "Fais un lien entre un des facts et ton écriture",
      "Invite tes abonnées à se présenter aussi en commentaire"
    ],
    "pourquoi_ca_marche": "Se présenter simplement renforce la proximité et humanise ton compte au-delà du livre."
  },
  {
    "idee": "Partage tes objectifs",
    "accroche": "Pourquoi tu écris ? Qu'est-ce que tu espères transmettre ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Explique pourquoi tu écris, au fond",
      "Partage ce que tu espères transmettre à travers ce livre",
      "Demande ce que la lecture leur apporte à elles"
    ],
    "pourquoi_ca_marche": "Un objectif clair donne du sens à ton travail et engage émotionnellement celles qui partagent la même vision."
  },
  {
    "idee": "Partage tes galères que tu rencontrons lors de l'écriture",
    "accroche": "Une scène que tu as du mal à écrire ? Une panne d'inspiration ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Décris une vraie difficulté rencontrée récemment",
      "Explique comment tu gères ou comptes la surmonter",
      "Demande si d'autres autrices vivent la même chose"
    ],
    "pourquoi_ca_marche": "La vulnérabilité assumée crée une connexion plus forte qu'une image parfaite et sans accroc."
  },
  {
    "idee": "Partage ton personnage préféré dans le manuscrit en cours d'écriture",
    "accroche": "Partage ton personnage préféré et explique pourquoi.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Présente le personnage et pourquoi c'est ton préféré",
      "Partage un détail que tu n'as pas encore dévoilé sur lui",
      "Demande lequel de tes personnages intrigue le plus tes abonnées"
    ],
    "pourquoi_ca_marche": "Créer un attachement à un personnage avant même la sortie du livre nourrit l'attente et l'envie de le rencontrer."
  },
  {
    "idee": "Partage un extrait de ton manuscrit",
    "accroche": "Une citation, un dialogue, une phrase… que tu as adoré écrire.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement"
    ],
    "structure": [
      "Choisis une phrase ou un dialogue marquant (courte citation)",
      "Explique en une ligne le contexte sans spoiler",
      "Demande la réaction ou ressenti de tes abonnées"
    ],
    "pourquoi_ca_marche": "Un extrait bien choisi donne un avant-goût concret de ta plume et suscite l'envie de lire la suite."
  },
  {
    "idee": "Intéresse-toi à tes abonnés",
    "accroche": "Apprends à connaître tes abonnés ! Romans indépendants ou séries ? Chapitres courts ou longs ? Personnages ambigus ou très gentils ?",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Pose 2-3 questions simples sur leurs préférences de lecture",
      "Propose des choix (ex: séries vs romans indépendants)",
      "Partage ensuite un résumé de leurs réponses dans un post suivant"
    ],
    "pourquoi_ca_marche": "Un sondage engage directement ta communauté et te donne des infos précieuses sur ce qu'elle attend de toi."
  },
  {
    "idee": "Partage la raison pour laquelle tu as décidé d'écrire ton livre",
    "accroche": "Raconte-nous comment t'est venue l'idée de ton livre : une illumination soudaine ou une idée qui a mûri au fil des années ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Raconte l'étincelle de départ de l'histoire",
      "Explique comment l'idée a évolué depuis",
      "Invite à partager en commentaire ce qui les inspire elles"
    ],
    "pourquoi_ca_marche": "L'origin story d'un livre crée un attachement émotionnel avant même sa sortie."
  },
  {
    "idee": "Partage des fun facts sur ton manuscrit en cours d'écriture",
    "accroche": "Combien de noms as-tu dû changer ? Combien de mots supprimés ? Combien d'erreurs ou de victoires ?",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Donne 3-4 chiffres ou anecdotes amusantes (mots supprimés, noms changés...)",
      "Ajoute une touche d'humour ou d'autodérision",
      "Termine par une question légère à tes abonnées"
    ],
    "pourquoi_ca_marche": "Le format 'fun facts' est léger, facile à consommer et donne un côté attachant et authentique."
  },
  {
    "idee": "Partage ta journée",
    "accroche": "Montre l'endroit où tu écris, ce que tu grignotes ou bois durant tes sessions, le temps que tu y passes…",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Montre ton environnement d'écriture (lieu, boisson, ambiance)",
      "Partage un moment marquant de ta session",
      "Invite tes abonnées à partager leur propre routine"
    ],
    "pourquoi_ca_marche": "Le format 'behind the scenes' quotidien renforce la proximité et donne un visage humain à ton travail."
  },
  {
    "idee": "Partage 3 auteurs que tu adores",
    "accroche": "Explique pourquoi tu adores lire leurs livres et quels sont tes préférés.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Nomme 3 auteurs et un livre marquant de chacun",
      "Explique en une phrase ce qu'ils t'ont appris ou inspirée",
      "Demande les recommandations de tes abonnées en retour"
    ],
    "pourquoi_ca_marche": "Recommander d'autres autrices crée de la bienveillance dans la communauté et positionne comme une vraie passionnée."
  },
  {
    "idee": "Partage un compte à rebours",
    "accroche": "Prépare plusieurs contenus pour teaser la sortie et spoile à chaque fois un détail : le titre, un morceau de la couverture…",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Choisis un détail à révéler à chaque publication (titre, couverture...)",
      "Publie-le avec un compte à rebours clair (J-X)",
      "Termine chaque post par un teaser de ce qui arrive le lendemain"
    ],
    "pourquoi_ca_marche": "Le compte à rebours crée un rendez-vous régulier avec ta communauté et une montée d'excitation progressive."
  },
  {
    "idee": "Partage les tropes du livre",
    "accroche": "Explique les tropes et trigger warnings s'il y en a.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Liste les tropes principaux de l'histoire",
      "Ajoute les trigger warnings pertinents",
      "Invite les lectrices concernées à se manifester en commentaire"
    ],
    "pourquoi_ca_marche": "Ça permet aux bonnes lectrices de se reconnaître direct dans ton histoire, et instaure la confiance sur les TW."
  },
  {
    "idee": "Donne quelques indices sur tes personnages",
    "accroche": "Fais plusieurs publications où tu partages les personnages principaux, secondaires, les lieux… Fais vivre ton livre.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Publie une série de posts, un personnage à la fois",
      "Donne un trait de caractère ou un visuel sans spoiler l'intrigue",
      "Termine sur une question du type 'qui a hâte de le rencontrer ?'"
    ],
    "pourquoi_ca_marche": "Découvrir les personnages avant la sortie crée un attachement qui donnera envie d'acheter le livre pour les retrouver."
  },
  {
    "idee": "Qu'est-ce qui t'a surpris dans ton roman ?",
    "accroche": "Une fin que tu n'avais pas prévue ? Une direction qui t'a surprise ?",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Raconte un élément que tu n'avais pas prévu en commençant à écrire",
      "Explique comment ça a changé la direction de l'histoire",
      "Demande si les lectrices ont ressenti la même surprise en lisant"
    ],
    "pourquoi_ca_marche": "Ça montre le côté organique de la création et intrigue sur ce qui a changé par rapport au plan initial."
  },
  {
    "idee": "X raisons d'acheter ce livre",
    "accroche": "Cite les raisons selon lesquelles il faudrait acheter ton livre.",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste 3 à 5 raisons concrètes et spécifiques (pas génériques)",
      "Illustre chaque raison par un détail propre à ton histoire",
      "Termine par un lien ou un call-to-action clair vers l'achat"
    ],
    "pourquoi_ca_marche": "Un argumentaire concret aide les lectrices hésitantes à se décider, surtout si les raisons sont spécifiques et pas génériques."
  },
  {
    "idee": "X raisons de ne pas acheter ton livre",
    "accroche": "Cite les raisons selon lesquelles il ne faudrait pas acheter ton livre (jeu sur l'autodérision ou le ciblage précis du lectorat).",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste des raisons avec un ton second degré ou assumé",
      "Retourne chaque raison en argument de vente déguisé",
      "Termine sur une pointe d'humour ou d'autodérision"
    ],
    "pourquoi_ca_marche": "Le contre-pied surprend et démarque du marketing classique, ça capte l'attention par effet de surprise."
  },
  {
    "idee": "Partage ton inspiration d'un personnage",
    "accroche": "D'où vient ce personnage ? Une personne réelle, un mix, une pure invention ?",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Explique d'où vient le personnage (réel, mix, pure invention)",
      "Partage une anecdote sur sa création",
      "Demande si les lectrices avaient deviné cette inspiration"
    ],
    "pourquoi_ca_marche": "Révéler les coulisses de la création d'un personnage renforce le lien entre lectrices et univers du livre."
  },
  {
    "idee": "Ce détail que personne n'a remarqué.",
    "accroche": "Jusqu'à aujourd'hui.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Annonce qu'il existe un détail caché dans le livre",
      "Révèle-le et explique pourquoi tu l'avais glissé là",
      "Invite les lectrices à relire pour vérifier"
    ],
    "pourquoi_ca_marche": "Ça donne une bonne raison de relire le livre et valorise les lectrices qui l'auraient repéré."
  },
  {
    "idee": "Les théories des lecteurs.",
    "accroche": "Certaines sont meilleures que les miennes.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Repartage 2-3 théories vues en commentaire ou en story",
      "Réagis à chacune sans tout confirmer ni infirmer",
      "Demande d'autres théories en commentaire"
    ],
    "pourquoi_ca_marche": "Ça valorise l'engagement de tes lectrices et prolonge la conversation autour du livre après la sortie."
  },
  {
    "idee": "Les scènes coupées.",
    "accroche": "Elles existaient vraiment.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Annonce qu'une scène n'a pas survécu à l'édition",
      "Partage le contexte ou un extrait de cette scène coupée",
      "Demande si elles auraient aimé la voir dans le livre"
    ],
    "pourquoi_ca_marche": "Le contenu inédit donne un sentiment d'exclusivité et prolonge l'univers du livre après sa sortie."
  },
  {
    "idee": "Les fins alternatives.",
    "accroche": "Oui, il y en avait plusieurs.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Révèle qu'il existait une ou plusieurs fins différentes",
      "Décris brièvement en quoi elle différait de la version finale",
      "Demande laquelle elles auraient préférée"
    ],
    "pourquoi_ca_marche": "Montrer les chemins non empruntés nourrit la curiosité et invite à débattre autour de l'histoire."
  },
  {
    "idee": "Les personnages aujourd'hui.",
    "accroche": "Que deviennent-ils après le livre ?",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Imagine où en sont tes personnages après la fin du livre",
      "Partage ce fait comme un petit bonus/epilogue informel",
      "Demande ce qu'elles imaginaient pour eux"
    ],
    "pourquoi_ca_marche": "Ça prolonge la vie des personnages au-delà du livre et entretient l'attachement après la lecture."
  },
  {
    "idee": "Les musiques des personnages.",
    "accroche": "Playlist officielle.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Partage 2-3 titres qui représentent chaque personnage",
      "Explique brièvement le lien entre la musique et le personnage",
      "Invite à écouter la playlist complète si tu en as fait une"
    ],
    "pourquoi_ca_marche": "La musique est un moyen sensoriel immédiat de faire ressentir l'ambiance et la personnalité d'un personnage."
  },
  {
    "idee": "Les citations préférées des lecteurs.",
    "accroche": "Compilation.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Compile 3-4 citations partagées par tes lectrices",
      "Republie-les avec leur retour ou leur pseudo (avec accord)",
      "Invite à partager la leur si elle n'y est pas"
    ],
    "pourquoi_ca_marche": "Mettre en avant les mots des lectrices crée de la preuve sociale et donne envie de découvrir le livre."
  },
  {
    "idee": "Partage ton premier exemplaire.",
    "accroche": "Partage ce que tu ressens en tenant ton premier exemplaire.",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Partage une photo/vidéo du moment où tu reçois le livre",
      "Décris ce que tu ressens en le tenant",
      "Remerciez celles qui ont suivi l'aventure jusque-là"
    ],
    "pourquoi_ca_marche": "Ce moment est hautement émotionnel et authentique, il crée une vraie proximité avec ta communauté."
  },
  {
    "idee": "Si mon livre était un film Netflix…",
    "accroche": "Partage une inspiration visuelle de ton livre.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Décris le pitch de ton livre façon bande-annonce Netflix",
      "Ajoute une inspiration visuelle ou un casting fictif",
      "Demande si elles regarderaient ce 'film'"
    ],
    "pourquoi_ca_marche": "Le format 'et si c'était un film' est familier et ludique, ça rend le livre plus accessible à imaginer."
  },
  {
    "idee": "POV : tu viens d'ouvrir mon roman…",
    "accroche": "Décris la première scène comme si le lecteur venait tout juste de tourner la page.",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Décris la première scène comme si le lecteur venait de tourner la page",
      "Utilise un ton immersif à la deuxième personne",
      "Termine sur un cliffhanger ou une question d'ambiance"
    ],
    "pourquoi_ca_marche": "Le format immersif POV plonge directement la lectrice dans l'histoire avant même qu'elle l'ait ouverte."
  },
  {
    "idee": "Le casting de rêve.",
    "accroche": "Quel acteur jouerait chaque personnage ?",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Choisis un acteur/actrice pour chaque personnage principal",
      "Explique brièvement pourquoi ce choix colle au personnage",
      "Demande leur propre casting en commentaire"
    ],
    "pourquoi_ca_marche": "Visualiser les personnages via des acteurs connus aide les lectrices à se les représenter concrètement."
  },
  {
    "idee": "Les personnages s'ils avaient un compte Spotify.",
    "accroche": "La playlist qui résume sa personnalité en 5 titres.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Imagine la playlist personnelle de ton personnage (5 titres)",
      "Explique en une ligne ce que ça révèle de sa personnalité",
      "Demande quelle playlist elles imaginent pour lui"
    ],
    "pourquoi_ca_marche": "Un format ludique et original qui dévoile la personnalité d'un personnage sans rien spoiler de l'intrigue."
  },
  {
    "idee": "Les red flags de mon héros.",
    "accroche": "Sois honnête, il en a. Lesquels ?",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste 3-4 red flags assumés de ton héros",
      "Ajoute une touche d'humour ou d'autodérision",
      "Demande si elles vont craquer quand même"
    ],
    "pourquoi_ca_marche": "Le format 'red flags' est très viral en romance, il joue sur l'attrait ambigu qu'on a pour les héros imparfaits."
  },
  {
    "idee": "Les green flags de ton héros",
    "accroche": "Ceux qui font fondre tes lectrices.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste les qualités qui rendent ton héros irrésistible",
      "Illustre chaque green flag par une scène ou un trait précis",
      "Demande lequel les fait le plus craquer"
    ],
    "pourquoi_ca_marche": "Mettre en avant ce qui rend un personnage attachant donne une bonne raison concrète de vouloir le rencontrer en lisant."
  },
  {
    "idee": "Les personnages vus par leur historique Google.",
    "accroche": "Ce qu'il tape dans la barre de recherche à 3h du matin.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Imagine 3-4 recherches Google que ferait ton personnage",
      "Rends-les drôles ou révélatrices de sa situation dans l'histoire",
      "Demande ce qu'elles imaginent en plus"
    ],
    "pourquoi_ca_marche": "Un format humoristique et original qui donne un aperçu de la psychologie du personnage de façon détournée."
  },
  {
    "idee": "Si mon livre était une esthétique Pinterest.",
    "accroche": "Le moodboard que tu épinglerais pour résumer l'ambiance.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement"
    ],
    "structure": [
      "Partage un moodboard visuel représentant l'ambiance générale",
      "Légende avec les mots-clés de cette esthétique",
      "Demande ce que ça leur évoque avant même de lire"
    ],
    "pourquoi_ca_marche": "Le visuel capte instantanément une ambiance que des mots mettraient plus de temps à transmettre."
  },
  {
    "idee": "Quel personnage a complètement échappé à ton contrôle ?",
    "accroche": "\"À la base il devait mourir au chapitre 4…\"",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Livre sorti"
    ],
    "structure": [
      "Raconte comment ce personnage a pris une direction imprévue",
      "Explique ce que ça a changé dans l'histoire globale",
      "Demande si elles ont ressenti cette surprise en lisant"
    ],
    "pourquoi_ca_marche": "Ça montre le côté organique de la création et intrigue sur la part d'improvisation derrière un livre construit."
  },
  {
    "idee": "La scène que tu redoutes d'écrire",
    "accroche": "\"Je repousse cette scène depuis trois semaines.\"",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Annonce la scène que tu repousses depuis un moment",
      "Explique pourquoi elle est difficile à poser sur le papier",
      "Demande un peu de soutien ou d'encouragement à ta communauté"
    ],
    "pourquoi_ca_marche": "La vulnérabilité assumée crée un vrai lien de complicité et humanise le travail d'écriture."
  },
  {
    "idee": "Le personnage que tu détestes… alors que tes lecteurs vont sûrement l'adorer",
    "accroche": "\"Je sens déjà que vous allez me juger.\"",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement"
    ],
    "structure": [
      "Présente le personnage et pourquoi tu ne l'apprécies pas particulièrement",
      "Explique ce qui, selon toi, va pourtant plaire aux lectrices",
      "Demande si elles confirment ton pronostic après lecture"
    ],
    "pourquoi_ca_marche": "Le contraste entre ton avis d'autrice et celui attendu des lectrices crée un effet piquant et de la curiosité."
  },
  {
    "idee": "Les recherches improbables faites pour écrire ton livre",
    "accroche": "Ton historique de recherche ferait flipper n'importe qui.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Liste 2-3 recherches Google insolites que tu as dû faire",
      "Ajoute le contexte (souvent le plus drôle)",
      "Termine sur une note d'autodérision"
    ],
    "pourquoi_ca_marche": "Le format humoristique est très partageable et montre le sérieux du travail derrière l'écriture, avec légèreté."
  },
  {
    "idee": "Une citation qui détruit émotionnellement",
    "accroche": "Celle que tu n'as pas encore osé partager.",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Partage la citation choisie (courte, percutante)",
      "Ajoute un minimum de contexte, sans spoiler",
      "Laisse le silence faire son effet, peu de texte autour"
    ],
    "pourquoi_ca_marche": "Une citation forte et courte génère un choc émotionnel immédiat qui donne envie de connaître le contexte complet."
  },
  {
    "idee": "Le personnage que tout le monde va aimer... à tort",
    "accroche": "Je vous laisse cinq chapitres avant de changer d'avis.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement"
    ],
    "structure": [
      "Présente le personnage sans révéler pourquoi 'à tort'",
      "Ajoute un avertissement taquin ('je vous laisse 5 chapitres')",
      "Termine par un teaser du twist à venir"
    ],
    "pourquoi_ca_marche": "Le teasing d'un twist futur crée une attente et pousse à lire pour découvrir la vérité sur le personnage."
  },
  {
    "idee": "Ce qu'il ne faut PAS attendre de ce roman",
    "accroche": "Si tu cherches une romance douce… passe ton chemin.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Balance ton accroche direct, sans détour",
      "Enchaîne avec 2-3 choses que ton livre N'EST PAS",
      "Termine en assumant ce que ton livre EST à la place"
    ],
    "pourquoi_ca_marche": "Ce type de post filtre ton lectorat : il éloigne les lectrices hors cible et attire plus fort celles qui adorent ce genre."
  },
  {
    "idee": "Le personnage préféré des lecteurs VS le tien",
    "accroche": "Spoiler : ce n'est jamais le même.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Révèle ton personnage préféré en tant qu'autrice",
      "Partage ce que les lectrices semblent préférer d'après leurs retours",
      "Commente l'écart avec humour ou surprise"
    ],
    "pourquoi_ca_marche": "Le contraste entre le regard de l'autrice et celui des lectrices crée un échange et donne envie de donner son avis."
  },
  {
    "idee": "Les questions qu'on te pose tout le temps",
    "accroche": "Celle qu'on te pose à chaque fois qu'on découvre que tu écris.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Cite la question la plus fréquente qu'on te pose",
      "Réponds-y sincèrement, avec un peu d'humour si possible",
      "Invite à poser d'autres questions en commentaire"
    ],
    "pourquoi_ca_marche": "Un format FAQ léger renforce la proximité et donne une bonne occasion de relancer les échanges."
  },
  {
    "idee": "La phrase dont tu es le plus fière",
    "accroche": "\"J'ai écrit cette phrase il y a six mois… et je l'aime toujours autant.\"",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Livre sorti"
    ],
    "structure": [
      "Partage la phrase exacte que tu affectionnes particulièrement",
      "Explique pourquoi elle compte autant pour toi",
      "Demande si une phrase du livre les a marquées de la même façon"
    ],
    "pourquoi_ca_marche": "Montrer sa fierté sur un détail précis humanise l'autrice et invite à un vrai échange sur le texte."
  },
  {
    "idee": "Le chapitre qui t'a demandé le plus de réécriture",
    "accroche": "Celui que tu as réécrit encore, et encore, et encore.",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Livre sorti"
    ],
    "structure": [
      "Annonce le chapitre concerné (sans trop spoiler)",
      "Explique ce qui rendait la réécriture nécessaire",
      "Demande si elles auraient deviné en le lisant"
    ],
    "pourquoi_ca_marche": "Ça valorise le travail invisible derrière un chapitre fluide à la lecture, souvent nourri de nombreuses réécritures."
  },
  {
    "idee": "Les red flags de mes personnages",
    "accroche": "Chacun a le sien. Lequel est le pire ?",
    "etapes": [
      "Manuscrit en cours d'écriture",
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste un red flag par personnage principal, façon inventaire",
      "Garde un ton léger et assumé",
      "Demande lequel est, selon elles, le pire"
    ],
    "pourquoi_ca_marche": "Étendre le concept 'red flags' à tout le casting crée un post plus riche et interactif que sur un seul personnage."
  },
  {
    "idee": "Les détails de couverture préférés",
    "accroche": "Ce petit détail sur la couverture que tu adores et que personne ne remarque.",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Montre la couverture avec un zoom sur le détail en question",
      "Explique pourquoi ce détail précis te plaît tant",
      "Demande s'il avait été remarqué avant que tu le pointes"
    ],
    "pourquoi_ca_marche": "Zoomer sur un détail donne une nouvelle raison de regarder la couverture et valorise le travail graphique."
  },
  {
    "idee": "Les scènes préférées des lecteurs VS les miennes",
    "accroche": "Est-ce que vos scènes préférées sont les mêmes que les miennes ?",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage ta scène préférée en tant qu'autrice",
      "Partage celle qui revient le plus dans les retours de lectrices",
      "Commente l'écart ou la surprise que ça te procure"
    ],
    "pourquoi_ca_marche": "Comparer les points de vue crée un dialogue et montre que le livre peut toucher différemment chaque lectrice."
  },
  {
    "idee": "X bonne raison de lire :",
    "accroche": "X bonnes raisons de lire [titre du livre].",
    "etapes": [
      "Pré-lancement",
      "Livre sorti"
    ],
    "structure": [
      "Liste X raisons concrètes et spécifiques à ton livre",
      "Illustre chaque raison par un détail propre à l'histoire",
      "Termine par un appel clair à l'action (lien, où acheter...)"
    ],
    "pourquoi_ca_marche": "Un argumentaire clair et concret aide à convaincre une lectrice encore hésitante à sauter le pas."
  },
  {
    "idee": "Le mot que tu utilises trop souvent dans ce manuscrit",
    "accroche": "Ton correcteur automatique doit détester ce mot autant que toi.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Révèle le mot en question avec humour",
      "Explique comment tu l'as traqué à la relecture",
      "Demande si d'autres autrices ont ce genre de tic d'écriture"
    ],
    "pourquoi_ca_marche": "L'autodérision sur un détail très concret et relatable crée un moment léger et complice avec ta communauté d'autrices."
  },
  {
    "idee": "La scène que tu as réécrite le plus de fois avant même de la finir",
    "accroche": "Version 6, toujours pas contente.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Annonce combien de versions cette scène a connu",
      "Explique ce qui te posait problème à chaque fois",
      "Demande un peu de patience/soutien à ta communauté"
    ],
    "pourquoi_ca_marche": "Montrer la persévérance derrière une scène complexe valorise le travail d'écriture sans en dévoiler le contenu."
  },
  {
    "idee": "Ta playlist d'écriture du moment",
    "accroche": "Ce qui tourne en boucle pendant que tu écris cette histoire.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Partage 3-5 titres qui tournent en boucle pendant que tu écris",
      "Explique en une phrase pourquoi ils collent à l'ambiance du livre",
      "Invite à écouter en story ou en lien"
    ],
    "pourquoi_ca_marche": "La musique est un point d'entrée sensoriel simple qui donne un avant-goût de l'ambiance du livre à venir."
  },
  {
    "idee": "Le trope que tu détournes volontairement dans ce livre",
    "accroche": "Tu prends le trope classique… et tu le casses.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Nomme le trope classique que tu prends comme base",
      "Explique en une phrase comment tu le détournes ou le subvertis",
      "Demande si ça leur donne encore plus envie de découvrir la suite"
    ],
    "pourquoi_ca_marche": "Annoncer une subversion de trope attire les lectrices qui aiment être surprises par des classiques revisités."
  },
  {
    "idee": "Un dialogue que tu as adoré écrire",
    "accroche": "Celui que tu as relu trois fois juste pour le plaisir.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Partage un extrait de dialogue court, sans trop de contexte",
      "Explique en une ligne pourquoi ce moment t'a marquée en l'écrivant",
      "Demande la première impression de tes abonnées"
    ],
    "pourquoi_ca_marche": "Un dialogue vivant donne un avant-goût direct du ton et de l'alchimie entre tes personnages."
  },
  {
    "idee": "La différence entre le plan de départ et où tu en es maintenant",
    "accroche": "Rien ne s'est passé comme prévu. Et c'est tant mieux.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Décris brièvement le plan initial de l'histoire",
      "Explique ce qui a changé en cours d'écriture et pourquoi",
      "Demande si elles préfèrent les histoires planifiées ou qui évoluent"
    ],
    "pourquoi_ca_marche": "Montrer l'évolution du projet humanise le processus créatif, souvent perçu comme figé de l'extérieur."
  },
  {
    "idee": "Ce que tu as dû sacrifier ou couper pour que l'histoire fonctionne",
    "accroche": "Ce passage que tu adorais… et qui a fini à la poubelle.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Annonce qu'un passage que tu adorais a été coupé",
      "Explique brièvement pourquoi c'était nécessaire pour l'histoire",
      "Demande si elles auraient aimé le garder"
    ],
    "pourquoi_ca_marche": "Révéler les choix difficiles d'écriture montre l'exigence derrière le résultat final et suscite la curiosité."
  },
  {
    "idee": "Le personnage secondaire qui prend plus de place que prévu",
    "accroche": "Il devait apparaître deux fois. Il est partout.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Présente ce personnage secondaire devenu plus important",
      "Explique comment/pourquoi il a pris cette ampleur",
      "Demande si elles ont hâte de le découvrir"
    ],
    "pourquoi_ca_marche": "Teaser un personnage secondaire surprenant élargit l'intérêt du livre au-delà des deux protagonistes principaux."
  },
  {
    "idee": "Ta technique anti-page blanche",
    "accroche": "Ce que tu fais quand les mots ne viennent plus.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Partage ta technique concrète contre la panne d'inspiration",
      "Donne un exemple récent où elle t'a été utile",
      "Demande les techniques des autres autrices en retour"
    ],
    "pourquoi_ca_marche": "Un conseil pratique et concret crée de la valeur ajoutée réelle pour les abonnées qui écrivent elles-mêmes."
  },
  {
    "idee": "Le nombre de mots que tu écris en moyenne par session",
    "accroche": "Spoiler : ce n'est jamais autant que tu voudrais.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Donne le chiffre avec honnêteté (pas besoin d'impressionner)",
      "Ajoute un peu de contexte ou d'humour sur les jours difficiles",
      "Demande la moyenne des autres autrices dans les commentaires"
    ],
    "pourquoi_ca_marche": "Un chiffre concret et honnête déculpabilise les autrices qui se comparent à des rythmes irréalistes."
  },
  {
    "idee": "Une règle d'écriture que tu t'es fixée pour ce livre",
    "accroche": "La contrainte que tu t'es imposée sur ce manuscrit.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Énonce la contrainte ou règle que tu t'es imposée",
      "Explique pourquoi tu l'as choisie pour ce projet précis",
      "Demande si elles ont remarqué cette cohérence en lisant"
    ],
    "pourquoi_ca_marche": "Révéler une contrainte créative montre la réflexion derrière la construction du livre, au-delà de l'inspiration seule."
  },
  {
    "idee": "Le titre de travail vs le titre final",
    "accroche": "Le nom que ce livre portait avant de trouver le bon.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Révèle l'ancien titre de travail du livre",
      "Explique pourquoi tu as changé pour le titre final",
      "Demande lequel elles auraient préféré"
    ],
    "pourquoi_ca_marche": "Ce type de révélation coulisse est toujours très apprécié, il montre l'évolution du projet dans le temps."
  },
  {
    "idee": "Ce que ce manuscrit t'apprend sur toi-même",
    "accroche": "Écrire cette histoire t'a changée, toi aussi.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Partage une prise de conscience personnelle liée à l'écriture de ce livre",
      "Fais le lien entre cette réflexion et un thème du livre",
      "Invite à un échange sincère en commentaire"
    ],
    "pourquoi_ca_marche": "Le partage introspectif renforce la dimension humaine et authentique de ton compte, au-delà du simple livre."
  },
  {
    "idee": "La scène la plus délicate à doser émotionnellement",
    "accroche": "Celle où tu as réécrit chaque ligne dix fois pour trouver le bon équilibre.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Annonce la scène concernée (sans trop en dire)",
      "Explique en quoi l'équilibre émotionnel était difficile à trouver",
      "Demande si le dosage se ressent bien à la lecture"
    ],
    "pourquoi_ca_marche": "Ça valorise la finesse d'écriture sur les scènes sensibles, un vrai savoir-faire d'autrice."
  },
  {
    "idee": "Ton rituel avant de commencer à écrire",
    "accroche": "Ce que tu fais toujours avant d'ouvrir le manuscrit.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Décris ton rituel concret (boisson, musique, lieu...)",
      "Explique pourquoi il t'aide à te mettre en condition",
      "Demande le rituel des autres autrices"
    ],
    "pourquoi_ca_marche": "Un rituel personnel est un détail concret et attachant qui humanise ta routine d'écriture."
  },
  {
    "idee": "Le personnage que tu comprends le moins encore",
    "accroche": "Celui qui te surprend encore, chapitre après chapitre.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Présente le personnage qui te surprend encore en l'écrivant",
      "Explique ce qui reste flou ou mystérieux pour toi à son sujet",
      "Demande si elles pensent avoir une intuition sur lui"
    ],
    "pourquoi_ca_marche": "Admettre ne pas tout maîtriser d'un personnage intrigue et humanise le processus créatif."
  },
  {
    "idee": "Une phrase que tu as supprimée et regrettée",
    "accroche": "Elle n'a pas survécu à la relecture. Tu la regrettes encore.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Partage la phrase supprimée",
      "Explique pourquoi elle n'a pas survécu à la relecture",
      "Demande si elles auraient aimé la voir dans le livre final"
    ],
    "pourquoi_ca_marche": "Le contenu inédit crée un sentiment d'exclusivité et prolonge l'expérience du livre après sa sortie."
  },
  {
    "idee": "Compte à rebours J-X avec un mot du livre à chaque post",
    "accroche": "Un mot par jour, jusqu'au grand jour.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Choisis un mot évocateur du livre par jour de compte à rebours",
      "Publie-le seul ou avec un visuel minimaliste",
      "Additionne les mots au fil des jours pour créer une phrase mystère"
    ],
    "pourquoi_ca_marche": "Le format feuilletonnant crée un rendez-vous quotidien et une tension qui grandit jusqu'à la sortie."
  },
  {
    "idee": "Sondage sur le trope espéré par les abonnées",
    "accroche": "Devine ce qui t'attend dans ce livre.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Propose 2-4 tropes en options de sondage",
      "Laisse voter tes abonnées sur celui qu'elles espèrent retrouver",
      "Révèle ensuite si tu confirmes ou surprends leur pari"
    ],
    "pourquoi_ca_marche": "Le sondage engage activement ta communauté et te donne un aperçu direct de ses attentes avant la sortie."
  },
  {
    "idee": "Annonce officielle de la date de sortie",
    "accroche": "La date est posée. Le compte à rebours commence.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Annonce la date clairement, avec un visuel dédié",
      "Ajoute une phrase sur ce que ça représente pour toi",
      "Invite à noter la date ou à s'abonner pour ne rien louper"
    ],
    "pourquoi_ca_marche": "Une date officielle donne un objectif concret à ta communauté et enclenche vraiment le compte à rebours."
  },
  {
    "idee": "Reveal de la couverture",
    "accroche": "La couverture, enfin dévoilée.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Crée du suspense avant la révélation (teaser léger)",
      "Dévoile la couverture dans un post ou une vidéo dédiée",
      "Explique en légende ce qu'elle représente ou pourquoi ce choix"
    ],
    "pourquoi_ca_marche": "Le reveal de couverture est un moment fort attendu par la communauté, il génère naturellement de l'engagement."
  },
  {
    "idee": "Reveal du titre",
    "accroche": "Le titre que tu gardais secret depuis des mois.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Tease le fait qu'un titre a été gardé secret jusqu'ici",
      "Révèle-le avec un visuel ou une mise en scène soignée",
      "Explique brièvement pourquoi ce titre en particulier"
    ],
    "pourquoi_ca_marche": "Le titre est l'un des premiers points de contact avec le livre, sa révélation marque une étape clé du lancement."
  },
  {
    "idee": "Playlist officielle de la bande-son du livre",
    "accroche": "La playlist à écouter avant de plonger dans l'histoire.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Partage le lien ou visuel de la playlist complète",
      "Mets en avant 2-3 titres clés et leur lien avec l'histoire",
      "Invite à l'écouter avant la sortie pour se mettre dans l'ambiance"
    ],
    "pourquoi_ca_marche": "Une playlist officielle plonge les futures lectrices dans l'ambiance avant même d'avoir le livre entre les mains."
  },
  {
    "idee": "Extrait exclusif réservé aux abonnées",
    "accroche": "Un extrait, rien que pour vous, avant tout le monde.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Annonce l'exclusivité (accessible uniquement à un canal précis)",
      "Partage l'extrait choisi, court et percutant",
      "Remercie pour la fidélité qui permet cet accès en avant-première"
    ],
    "pourquoi_ca_marche": "L'exclusivité récompense les abonnées les plus fidèles et incite les autres à s'inscrire pour ne rien manquer."
  },
  {
    "idee": "Concours pour gagner un exemplaire dédicacé",
    "accroche": "Un exemplaire dédicacé à gagner avant la sortie officielle.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Explique les règles simples du concours",
      "Précise la date de tirage au sort et le prix",
      "Encourage le partage pour multiplier la visibilité"
    ],
    "pourquoi_ca_marche": "Un concours génère de l'engagement et de la visibilité tout en récompensant l'enthousiasme de ta communauté."
  },
  {
    "idee": "\"Ce livre est pour toi si…\" (ciblage lectorat)",
    "accroche": "Tu te reconnais dans cette liste ? Ce livre est fait pour toi.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Liste 3-5 critères ou envies qui définissent ta lectrice idéale",
      "Utilise un ton direct et complice",
      "Termine par une invitation claire à découvrir le livre"
    ],
    "pourquoi_ca_marche": "Ce ciblage direct aide les bonnes lectrices à se reconnaître immédiatement et à se sentir concernées."
  },
  {
    "idee": "Collab avec une autre autrice du genre",
    "accroche": "On croise nos univers, le temps d'une collab.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Présente l'autrice avec qui tu collabores",
      "Explique le format de la collab (post croisé, interview, live...)",
      "Invite les deux communautés à se découvrir mutuellement"
    ],
    "pourquoi_ca_marche": "Une collaboration permet de toucher un nouveau public déjà qualifié, fan du même genre littéraire."
  },
  {
    "idee": "Behind the scenes de la création de la couverture",
    "accroche": "Ce qui se cache derrière le choix de cette couverture.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Montre les étapes ou versions successives de la couverture",
      "Explique les choix qui ont mené à la version finale",
      "Demande leur avis sur le résultat"
    ],
    "pourquoi_ca_marche": "Montrer le travail derrière la couverture valorise le processus créatif et l'investissement mis dans le livre."
  },
  {
    "idee": "Les inspirations qui ont nourri l'univers du livre",
    "accroche": "Ce qui a nourri cet univers avant même le premier mot.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Cite 2-3 sources d'inspiration (films, lieux, musiques, lectures)",
      "Explique le lien concret avec ton univers",
      "Demande si ça se ressent en découvrant le livre"
    ],
    "pourquoi_ca_marche": "Révéler les inspirations donne des clés de lecture supplémentaires et enrichit l'expérience avant la sortie."
  },
  {
    "idee": "Un mood board complet du roman",
    "accroche": "L'ambiance du livre, résumée en une planche.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Compose un visuel avec plusieurs images représentant l'ambiance",
      "Légende avec 2-3 mots-clés évocateurs",
      "Invite à deviner l'histoire à partir de ce moodboard"
    ],
    "pourquoi_ca_marche": "Un moodboard complet permet de ressentir l'ambiance générale du livre en un coup d'œil, sans texte."
  },
  {
    "idee": "Session de questions-réponses avant sortie",
    "accroche": "Posez vos questions avant le jour J.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Annonce le format Q&A et la date/durée",
      "Réponds aux questions en story ou en direct",
      "Compile ensuite les meilleures réponses dans un post récap"
    ],
    "pourquoi_ca_marche": "Le Q&A répond directement aux interrogations des futures lectrices et renforce la proximité avant le lancement."
  },
  {
    "idee": "Explication du choix édition ou autoédition",
    "accroche": "Pourquoi tu as choisi cette voie pour ce livre.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Explique ton choix (maison d'édition ou autoédition)",
      "Partage brièvement pourquoi cette voie te correspondait",
      "Invite les autrices en questionnement à te poser leurs questions"
    ],
    "pourquoi_ca_marche": "Ce sujet intéresse particulièrement les autrices en devenir et renforce ta posture d'autrice-entrepreneuse transparente."
  },
  {
    "idee": "Le pitch en une phrase",
    "accroche": "Ce livre, résumé en une seule phrase.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Résume ton livre en une phrase percutante",
      "Ajoute un visuel simple pour accompagner la phrase",
      "Utilise-la comme accroche réutilisable partout (bio, posts, pub)"
    ],
    "pourquoi_ca_marche": "Un pitch clair et court est facilement mémorisable et partageable, essentiel pour capter l'attention rapidement."
  },
  {
    "idee": "\"Si tu as aimé X, tu vas adorer ce livre\"",
    "accroche": "La comparaison qui va te donner envie de le lire.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Cite un livre ou une autrice connue dans le même genre",
      "Explique les points communs avec ton propre livre",
      "Invite à découvrir ton livre pour retrouver cette même sensation"
    ],
    "pourquoi_ca_marche": "La comparaison avec une référence connue rassure et facilite la décision d'achat pour une lectrice hésitante."
  },
  {
    "idee": "Une lettre ouverte aux futures lectrices",
    "accroche": "Ce que tu as envie de dire à celles qui vont bientôt te lire.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Adresse-toi directement à tes futures lectrices, ton sincère",
      "Partage ce que tu espères qu'elles ressentiront en lisant",
      "Termine par un remerciement anticipé pour leur confiance"
    ],
    "pourquoi_ca_marche": "Une lettre personnelle crée une relation intime avant même la première page lue."
  },
  {
    "idee": "Premiers retours des lecteurs ARC",
    "accroche": "Les toutes premières réactions, avant la sortie officielle.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Sélectionne 2-3 retours marquants de tes lecteurs ARC",
      "Partage-les avec leur accord (citation courte ou capture)",
      "Remercie les ARC readers pour leur retour anticipé"
    ],
    "pourquoi_ca_marche": "Les premiers avis créent de la preuve sociale avant même la sortie officielle et rassurent les indécises."
  },
  {
    "idee": "Un jeu vrai ou faux sur le livre",
    "accroche": "Vrai ou faux : sauras-tu deviner ?",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Propose 3-5 affirmations sur le livre, vraies ou fausses",
      "Laisse les abonnées deviner en commentaire ou en sondage",
      "Révèle les réponses dans un post ou une story suivante"
    ],
    "pourquoi_ca_marche": "Le format jeu est ludique, facile à partager, et pousse à l'interaction sans effort de réflexion long."
  },
  {
    "idee": "Compte à rebours des dernières 24h avant sortie",
    "accroche": "Plus que 24h avant que ce livre soit entre vos mains.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Marque le début du compte à rebours final avec un visuel fort",
      "Publie des rappels ponctuels dans la journée (heure de sortie, lien...)",
      "Termine sur un message d'excitation ou de remerciement au moment J"
    ],
    "pourquoi_ca_marche": "Les dernières 24h créent un pic d'urgence et d'excitation, moment clé pour maximiser les ventes du jour J."
  },
  {
    "idee": "Repost des plus belles critiques reçues",
    "accroche": "Ces mots de lectrices qui te font chaud au cœur.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Sélectionne 2-3 critiques marquantes et positives",
      "Republie-les avec leur accord (capture ou citation courte)",
      "Remercie sincèrement les lectrices concernées"
    ],
    "pourquoi_ca_marche": "Les avis de lectrices existantes rassurent les futures lectrices, c'est une preuve sociale puissante et gratuite."
  },
  {
    "idee": "Premiers retours lecteurs après sortie",
    "accroche": "Les toutes premières réactions, à peine le livre sorti.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage les toutes premières réactions reçues",
      "Exprime ton émotion sincère à leur lecture",
      "Invite les autres lectrices à partager leur propre avis"
    ],
    "pourquoi_ca_marche": "Les tout premiers retours créent une dynamique d'engouement collectif juste après le lancement."
  },
  {
    "idee": "Session live de questions après sortie",
    "accroche": "Posez-moi toutes vos questions, spoilers autorisés cette fois.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Annonce le format live et le créneau",
      "Réponds en direct, spoilers autorisés cette fois",
      "Fais un récap des meilleures questions/réponses ensuite"
    ],
    "pourquoi_ca_marche": "Un live post-sortie permet un vrai échange en profondeur, incluant les spoilers, impossible avant la sortie."
  },
  {
    "idee": "Le moment où tu as vu ton livre en librairie",
    "accroche": "Ce moment où ton livre est là, sur une vraie étagère.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage la photo/vidéo du moment en librairie",
      "Décris ce que tu ressens à cet instant précis",
      "Invite tes lectrices à partager si elles l'ont vu aussi quelque part"
    ],
    "pourquoi_ca_marche": "Ce moment est hautement symbolique et émotionnel, il crée un vrai instant de partage authentique."
  },
  {
    "idee": "Les fanarts reçus des lectrices",
    "accroche": "Ce que vos talents ont créé à partir de mon histoire.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Repartage un ou plusieurs fanarts (avec accord de l'artiste)",
      "Exprime ta réaction sincère en les découvrant",
      "Encourage les autres lectrices créatives à partager les leurs aussi"
    ],
    "pourquoi_ca_marche": "Mettre en avant la créativité des lectrices renforce leur engagement et valorise la communauté autour du livre."
  },
  {
    "idee": "Un débrief un mois après la sortie",
    "accroche": "Un mois plus tard, voici ce qui a changé.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Fais un point sincère sur le mois écoulé depuis la sortie",
      "Partage ce qui t'a surprise (bien ou moins bien)",
      "Remercie la communauté pour son soutien sur cette période"
    ],
    "pourquoi_ca_marche": "Un bilan honnête un mois après montre de la transparence, appréciée par une communauté qui suit ton parcours."
  },
  {
    "idee": "Les statistiques amusantes autour des ventes",
    "accroche": "Des chiffres qui te font toujours autant halluciner.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage un ou deux chiffres marquants (ventes, pays, etc.)",
      "Ajoute une réaction personnelle sincère face à ce chiffre",
      "Remercie la communauté d'y avoir contribué"
    ],
    "pourquoi_ca_marche": "Des chiffres concrets valorisent le succès du livre sans être trop auto-promotionnels si le ton reste sincère."
  },
  {
    "idee": "Photos d'une séance de dédicace",
    "accroche": "Ces visages, ces mots échangés en dédicace.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage quelques photos marquantes de la séance",
      "Raconte un échange ou moment fort vécu ce jour-là",
      "Remercie les lectrices venues à ta rencontre"
    ],
    "pourquoi_ca_marche": "Les dédicaces humanisent la relation autrice-lectrices et donnent un aperçu concret et chaleureux de l'événement."
  },
  {
    "idee": "Répondre aux critiques négatives avec élégance",
    "accroche": "Toutes les lectures ne se valent pas, et c'est normal.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Reconnais qu'une lecture n'a pas convaincu, sans te justifier",
      "Rappelle avec bienveillance que tous les livres ne plaisent pas à tout le monde",
      "Termine sur une note positive et posée"
    ],
    "pourquoi_ca_marche": "Répondre avec élégance aux critiques renforce ta crédibilité et montre une posture professionnelle mature."
  },
  {
    "idee": "Ce que cette sortie t'a appris sur toi en tant qu'autrice",
    "accroche": "Ce que cette sortie a changé dans ta manière de te voir.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Partage une prise de conscience personnelle depuis la sortie",
      "Fais le lien avec ta vision de toi en tant qu'autrice",
      "Invite à un échange sincère en commentaire"
    ],
    "pourquoi_ca_marche": "Le partage introspectif après la sortie renforce l'authenticité de ton parcours d'autrice-entrepreneuse."
  },
  {
    "idee": "Les tropes préférés des lectrices d'après leurs retours",
    "accroche": "Ce que vous avez le plus aimé, sans surprise ou presque.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Compile les tropes les plus mentionnés dans les retours reçus",
      "Commente ce qui t'a surprise ou confirmée dans ces retours",
      "Demande si d'autres tropes ont été appréciés sans être mentionnés"
    ],
    "pourquoi_ca_marche": "Ça montre que tu écoutes réellement ta communauté et prolonge la conversation autour du livre déjà sorti."
  },
  {
    "idee": "Les scènes les plus commentées en story",
    "accroche": "Celle que tout le monde partage en story depuis la sortie.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Repère la scène qui revient le plus dans les story/DM",
      "Partage-la comme un highlight sans trop spoiler pour les autres",
      "Demande pourquoi cette scène en particulier les a marquées"
    ],
    "pourquoi_ca_marche": "Mettre en lumière une scène plébiscitée crée un sentiment de validation collective autour du livre."
  },
  {
    "idee": "Teaser léger du tome 2",
    "accroche": "Un tout petit indice sur la suite.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Donne un tout petit indice, sans rien dévoiler de concret",
      "Reste volontairement flou et mystérieux",
      "Termine sur une promesse de nouvelles infos bientôt"
    ],
    "pourquoi_ca_marche": "Un teaser léger entretient l'attente pour la suite sans dévoiler d'informations qui pourraient se retourner contre toi si le projet évolue."
  },
  {
    "idee": "Remerciement personnalisé à la communauté",
    "accroche": "Merci, sincèrement, à celles qui ont porté ce livre.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Adresse un vrai remerciement sincère à ta communauté",
      "Rappelle un moment marquant vécu grâce à elles",
      "Termine sur ce que tu leur souhaites/espères pour la suite"
    ],
    "pourquoi_ca_marche": "La gratitude sincère renforce le lien affectif avec ta communauté, au-delà de la simple promotion du livre."
  },
  {
    "idee": "Classement ou place dans les ventes",
    "accroche": "Un chiffre dont tu es fière de parler.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Annonce le chiffre ou classement atteint",
      "Exprime ta fierté sincère sans en faire trop",
      "Remercie celles qui ont contribué à ce résultat"
    ],
    "pourquoi_ca_marche": "Un chiffre concret valorise objectivement le succès du livre et crédibilise ton travail d'autrice."
  },
  {
    "idee": "Réagir aux memes créés par les lectrices",
    "accroche": "Vous avez créé ça sur mon livre… et j'adore.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Repartage un ou plusieurs memes créés sur ton livre",
      "Réagis avec humour et enthousiasme sincère",
      "Encourage à continuer à en créer si elles en ont d'autres"
    ],
    "pourquoi_ca_marche": "Les memes montrent un engagement fort de la communauté, les valoriser entretient cette dynamique créative."
  },
  {
    "idee": "Goodies ou objets dérivés créés autour du livre",
    "accroche": "Ce qui est né de cet univers, au-delà du livre.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Présente le ou les objets dérivés créés",
      "Explique le lien avec l'univers du livre",
      "Indique comment se les procurer si applicable"
    ],
    "pourquoi_ca_marche": "Des objets dérivés prolongent l'expérience du livre dans le quotidien des lectrices les plus engagées."
  },
  {
    "idee": "Rétrospective \"\"il y a un an\"\"",
    "accroche": "Il y a un an ce livre n'existait même pas encore vraiment.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Rappelle où tu en étais un an avant la sortie",
      "Compare avec la situation actuelle du livre",
      "Partage ce que cette évolution représente pour toi"
    ],
    "pourquoi_ca_marche": "La rétrospective temporelle valorise le chemin parcouru et inspire les autrices qui débutent leur propre projet."
  },
  {
    "idee": "Retour sur l'expérience d'écriture maintenant que c'est terminé",
    "accroche": "Avec le recul, voici ce que cette écriture t'a vraiment demandé.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Prends du recul sur l'ensemble du processus d'écriture",
      "Partage ce que ça t'a réellement demandé (temps, énergie, doutes)",
      "Termine sur ce que tu retiens de cette expérience"
    ],
    "pourquoi_ca_marche": "Le bilan à froid apporte une réflexion plus mature et authentique qu'un partage à chaud pendant l'écriture."
  },
  {
    "idee": "Les scènes que les lectrices citent le plus",
    "accroche": "La scène qui revient sans arrêt dans vos messages.",
    "etapes": [
      "Livre sorti"
    ],
    "structure": [
      "Identifie la scène qui revient le plus souvent dans les messages",
      "Partage-la comme un highlight commun à la communauté",
      "Demande ce qui, précisément, les a marquées dans cette scène"
    ],
    "pourquoi_ca_marche": "Mettre en lumière une scène plébiscitée crée un sentiment d'expérience partagée entre toutes les lectrices."
  },
  {
    "idee": "Le passage que tu as écrit d'une traite sans jamais te relire",
    "accroche": "Celui-là est sorti tout seul.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Raconte ce moment d'écriture fluide et rare",
      "Explique ce qui, selon toi, a permis cette fluidité",
      "Demande si elles ont ressenti cette fluidité à la lecture"
    ],
    "pourquoi_ca_marche": "Ce genre de moment d'écriture 'magique' fascine et humanise le processus créatif souvent perçu comme laborieux."
  },
  {
    "idee": "La transformation d'un personnage entre le chapitre 1 et maintenant",
    "accroche": "Il n'est plus du tout la même personne qu'au départ.",
    "etapes": [
      "Manuscrit en cours d'écriture"
    ],
    "structure": [
      "Décris le personnage au début de l'histoire",
      "Décris qui il est devenu à ce stade de l'écriture",
      "Demande ce qu'elles pensent avoir provoqué ce changement"
    ],
    "pourquoi_ca_marche": "Montrer l'arc de transformation d'un personnage intrigue sur le chemin parcouru sans rien spoiler de l'intrigue."
  },
  {
    "idee": "Le format de teasing que tu préfères utiliser pour ce livre",
    "accroche": "Story, reel, carrousel… ton format chouchou pour teaser.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Nomme ton format préféré (story, reel, carrousel...)",
      "Explique pourquoi il te correspond le mieux pour ce livre",
      "Demande aux abonnées quel format elles préfèrent consommer"
    ],
    "pourquoi_ca_marche": "Comprendre les préférences de format aide à ajuster ta stratégie de contenu en fonction des retours réels."
  },
  {
    "idee": "Bande-annonce littéraire (book trailer)",
    "accroche": "Imagine ton livre en bande-annonce, comme un film.",
    "etapes": [
      "Pré-lancement"
    ],
    "structure": [
      "Assemble un montage court (images/moodboard + texte qui défile)",
      "Garde juste assez de mystère pour ne rien spoiler",
      "Publie-la en amont de la sortie comme un vrai teaser cinéma"
    ],
    "pourquoi_ca_marche": "Le format vidéo capte davantage l'attention sur les réseaux et donne une dimension plus immersive et professionnelle au teasing."
  }
];
