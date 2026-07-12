import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { ideas } from "./src/data/ideas";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  
  const PORT = 3000;

  // API Health check
  app.get("/api/health", (req, res) => {
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
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
