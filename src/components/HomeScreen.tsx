import type { MouseEvent } from "react";
import { followGlow } from "./olympe/glow";

export type MuseId = "erato" | "uranie";

interface HomeScreenProps {
  /** Invoque une muse ; x / y = point de départ de l'animation (coordonnées de la fenêtre). */
  onInvoke: (muse: MuseId, x: number, y: number) => void;
}

export default function HomeScreen({ onInvoke }: HomeScreenProps) {
  const invoke = (muse: MuseId) => (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    onInvoke(muse, x, y);
  };

  return (
    <div className="a-main">
      <div className="a-hero">
        <p className="a-kicker">Ton outil d'inspiration de contenu pour les réseaux sociaux</p>
        <h1 className="a-title">Invoque ta muse</h1>
        <p className="a-sub">Entre inspiration et stratégie, laisse ta muse te guider</p>
      </div>

      <div className="portals">
        <button id="muse-inspiration-card" className="portal" type="button" onClick={invoke("erato")} onPointerMove={followGlow}>
          <span className="badge free">Gratuit</span>
          <span className="muse-name">Érato</span>
          <span className="muse-role">MUSE DE L'INSPIRATION</span>
          <span className="muse-desc">
            Muse de la poésie amoureuse, elle te souffle des idées, des angles et des accroches pour ton contenu.
          </span>
          <span className="cta">Invoquer Érato</span>
        </button>

        <button id="muse-strategy-card" className="portal" type="button" onClick={invoke("uranie")} onPointerMove={followGlow}>
          <span className="badge soon">Bientôt</span>
          <span className="muse-name">Uranie</span>
          <span className="muse-role">MUSE DE LA STRATÉGIE</span>
          <span className="muse-desc">Muse des astres, elle trace ta route pour faire connaître tes livres.</span>
          <span className="cta ghost">Rejoindre la liste d'attente</span>
        </button>
      </div>
    </div>
  );
}
