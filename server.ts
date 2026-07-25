import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { ideas } from "./src/data/ideas";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "0902", 10);

  app.use(express.json());

  // Request logging
  app.use((req, _res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
  });

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // API Health check
  app.get("/api/health", (_req, res) => {
    console.log("  → Health check OK");
    res.json({ status: "ok" });
  });

  // API Generate endpoint - Uses strictly local JSON database ideas
  app.post("/api/generate", async (req: express.Request, res: express.Response) => {
    try {
      const { etape, titreLivre, seenIdeas } = req.body;
      console.log(`  → Génération demandée: etape="${etape}", titreLivre="${titreLivre || "(non fourni)"}", seenIdeas=${Array.isArray(seenIdeas) ? seenIdeas.length : 0} idée(s) déjà vue(s)`);

      if (!etape) {
        console.log("  ✗ Erreur: étape manquante");
        return res.status(400).json({ error: "L'étape est requise." });
      }

      // Filter local ideas database for this step
      const filteredIdeas = ideas.filter(idea => idea.etapes.includes(etape));
      console.log(`  → ${filteredIdeas.length} idée(s) trouvée(s) pour l'étape "${etape}"`);

      if (filteredIdeas.length === 0) {
        console.log("  ✗ Erreur: aucune idée trouvée");
        return res.status(400).json({ error: "Aucune idée trouvée pour cette étape." });
      }

      // Filter out seen ideas if passed in the body
      let alreadySeen: string[] = Array.isArray(seenIdeas) ? seenIdeas : [];
      let remainingIdeas = filteredIdeas.filter(idea => !alreadySeen.includes(idea.idee));
      console.log(`  → ${remainingIdeas.length} idée(s) restante(s) après filtrage`);

      let hasReset = false;
      // If we don't have enough unseen ideas (less than 3), reset the pool
      if (remainingIdeas.length < 3) {
        console.log("  → Réinitialisation du pool d'idées (moins de 3 restantes)");
        remainingIdeas = filteredIdeas;
        alreadySeen = [];
        hasReset = true;
      }

      // Shuffle and select exactly 3 ideas
      const shuffled = [...remainingIdeas].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));
      console.log(`  → ${selected.length} idée(s) sélectionnée(s): ${selected.map(s => s.idee).join(", ")}`);

      // Map and replace simple placeholders like [titre du livre]
      const results = selected.map(item => {
        let accroche = item.accroche;
        if (titreLivre) {
          accroche = accroche.replace(/\[titre du livre\]/gi, titreLivre);
        } else {
          accroche = accroche.replace(/\[titre du livre\]/gi, "ton roman");
        }
        return {
          originalIdee: item.idee,
          idee: item.idee,
          accroche: accroche,
          structure: item.structure || [],
          pourquoi_ca_marche: item.pourquoi_ca_marche || ""
        };
      });

      console.log(`  ✓ Génération réussie (${results.length} idée(s) renvoyée(s), reset=${hasReset})`);
      return res.json({ ideas: results, hasReset, resetSeenIdeas: hasReset ? [] : undefined });

    } catch (error: any) {
      console.error("  ✗ Generation Error:", error);
      res.status(500).json({ error: "Une erreur critique s'est produite lors de la génération." });
    }
  });

  // API Feedback endpoint - Send feedback email to Jesy
  app.post("/api/feedback", async (req: express.Request, res: express.Response) => {
    try {
      const { ideaIdee, etape, comment, userEmail } = req.body;
      console.log(`  → Feedback reçu: idée="${ideaIdee}", étape="${etape}", de="${userEmail}"`);

      if (!comment || !comment.trim()) {
        return res.status(400).json({ error: "Le commentaire est requis." });
      }

      const feedbackEmail = process.env.FEEDBACK_EMAIL || "contact@musecreative.fr";

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "",
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: parseInt(process.env.SMTP_PORT || "587", 10) === 465,
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@musecreative.fr",
        to: feedbackEmail,
        subject: `Feedback idée - ${ideaIdee || "Idée sans titre"}`,
        text: `Nouveau feedback sur une idée :\n\nIdée : ${ideaIdee}\nÉtape : ${etape}\nUtilisatrice : ${userEmail}\n\nCommentaire :\n${comment}\n\n---\nEnvoyé depuis Muse Créative`,
        html: `<h3>Nouveau feedback sur une idée</h3>
          <p><strong>Idée :</strong> ${ideaIdee}</p>
          <p><strong>Étape :</strong> ${etape}</p>
          <p><strong>Utilisatrice :</strong> ${userEmail}</p>
          <p><strong>Commentaire :</strong></p>
          <p>${comment}</p>
          <hr><p><em>Envoyé depuis Muse Créative</em></p>`,
      };

      if (process.env.SMTP_HOST) {
        await transporter.sendMail(mailOptions);
        console.log(`  ✓ Feedback envoyé par email à ${feedbackEmail}`);
      } else {
        console.log(`  ⚠ SMTP non configuré - feedback non envoyé par email (à configurer)`);
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error("  ✗ Feedback Error:", error);
      res.status(500).json({ error: "Une erreur est survenue lors de l'envoi du feedback." });
    }
  });

  // Serve Vite in dev, static assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Block access to server bundle and sourcemaps
    app.get(['/server.cjs', '/server.cjs.map'], (_req, res) => res.status(403).end());
    // Long-cache hashed assets, short-cache index.html
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      index: false,
    }));
    app.get('*', (req, res) => {
      console.log(`  → SPA fallback: ${req.url}`);
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    const mode = process.env.NODE_ENV === "production" ? "production" : "development";
    console.log("─".repeat(50));
    console.log("  Muse Creative");
    console.log("─".repeat(50));
    console.log(`  Mode : ${mode}`);
    console.log(`  Port : ${process.env.PORT || PORT}`);
    console.log(`  URL  : http://localhost:${PORT}`);
    console.log(`  API  : /api/health, /api/generate`);
    console.log("─".repeat(50));
    console.log("  Server started successfully ✓");
  });
}

startServer().catch(err => {
  console.error("✗ Failed to start server:", err);
  process.exit(1);
});
