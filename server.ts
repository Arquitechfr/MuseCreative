import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import compression from "compression";
import { ideas } from "./src/data/ideas";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "0902", 10);

  app.use(compression());
  app.use(express.json());

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
    res.json({ status: "ok" });
  });

  // API Generate endpoint - Uses strictly local JSON database ideas
  app.post("/api/generate", async (req: express.Request, res: express.Response) => {
    try {
      const { etape, titreLivre, seenIdeas } = req.body;

      if (!etape) {
        return res.status(400).json({ error: "L'étape est requise." });
      }

      // Filter local ideas database for this step
      const filteredIdeas = ideas.filter(idea => idea.etapes.includes(etape));

      if (filteredIdeas.length === 0) {
        return res.status(400).json({ error: "Aucune idée trouvée pour cette étape." });
      }

      // Filter out seen ideas if passed in the body
      let alreadySeen: string[] = Array.isArray(seenIdeas) ? seenIdeas : [];
      let remainingIdeas = filteredIdeas.filter(idea => !alreadySeen.includes(idea.idee));

      let hasReset = false;
      // If we don't have enough unseen ideas (less than 3), reset the pool
      if (remainingIdeas.length < 3) {
        remainingIdeas = filteredIdeas;
        alreadySeen = [];
        hasReset = true;
      }

      // Shuffle and select exactly 3 ideas
      const shuffled = [...remainingIdeas].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));

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

      return res.json({ ideas: results, hasReset, resetSeenIdeas: hasReset ? [] : undefined });

    } catch (error: any) {
      console.error("Generation Error:", error);
      res.status(500).json({ error: "Une erreur critique s'est produite lors de la génération." });
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
    app.get('*', (_req, res) => {
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
  console.error("Failed to start server:", err);
});
