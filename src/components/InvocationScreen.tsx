import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { EtapeType } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { followGlow } from "./olympe/glow";
import type { MuseId } from "./HomeScreen";

interface InvocationScreenProps {
  muse: MuseId;
  /** true = écran ouvert ; false = il se referme (l'animation de fermeture se joue). */
  open: boolean;
  /** Centre de l'ouverture / fermeture en cercle (coordonnées de la fenêtre). */
  cx: number;
  cy: number;
  onSelectEtape: (etape: EtapeType, x: number, y: number) => void;
  onBackToMuses: () => void;
}

const STAGES: { etape: EtapeType; title: string; desc: string }[] = [
  {
    etape: "Manuscrit en cours d'écriture",
    title: "Manuscrit en cours",
    desc: "J'écris mon premier manuscrit et je commence à fédérer ma communauté.",
  },
  {
    etape: "Pré-lancement",
    title: "Pré-lancement",
    desc: "Mon livre est prêt, je prépare sa sortie et je veux faire monter la hype.",
  },
  {
    etape: "Livre sorti",
    title: "Livre déjà sorti",
    desc: "Mon roman est disponible, je veux le faire vivre et fidéliser mes lectrices.",
  },
];

const URANIE_SOON = [
  { title: "Campagnes de lancement", desc: "Un plan pas à pas pour ta sortie et tes précommandes." },
  { title: "Calendrier intelligent", desc: "Tes publications organisées semaine après semaine." },
  { title: "Stratégies de visibilité", desc: "Des pistes pour faire connaître tes livres au-delà de ta communauté." },
];

function Waitlist() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setError("Merci d'indiquer une adresse email valide.");
      return;
    }
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Une erreur est survenue, réessaie dans un instant.");
      }
      setDone(true);
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue, réessaie dans un instant.");
    } finally {
      setSending(false);
    }
  };

  if (done) return <p className="wl-ok">Tu es sur la liste. Uranie te fera signe.</p>;

  return (
    <form className="waitlist" onSubmit={submit} noValidate>
      <input
        id="waitlist-email"
        type="email"
        aria-label="Ton email"
        placeholder="ton.email@exemple.fr"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(null);
        }}
      />
      <button type="submit" disabled={sending}>
        {sending ? "Inscription…" : "M'inscrire"}
      </button>
      {error && <p className="wl-error" role="alert">{error}</p>}
    </form>
  );
}

export default function InvocationScreen({ muse, open, cx, cy, onSelectEtape, onBackToMuses }: InvocationScreenProps) {
  // L'ouverture se déclenche une image après le montage pour que la transition se joue.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const pick = (etape: EtapeType) => (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onSelectEtape(etape, e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
  };

  return (
    <div
      className={`reveal${shown ? " open" : ""}`}
      style={{ ["--cx" as string]: `${cx}px`, ["--cy" as string]: `${cy}px` }}
      role="dialog"
      aria-modal="true"
      aria-label={muse === "erato" ? "Érato t'écoute" : "Uranie prépare ses cartes du ciel"}
    >
      <div className="reveal-inner">
        {muse === "erato" ? (
          <>
            <span className="ghost-name" aria-hidden="true">Érato</span>
            <p className="r-kicker">Érato, muse de la poésie amoureuse</p>
            <h2>Érato t'écoute</h2>
            <p className="r-sub">Dis-lui où tu en es, elle te souffle trois idées.</p>
            <div className="stages">
              {STAGES.map((s) => (
                <button key={s.etape} type="button" className="portal stage" onClick={pick(s.etape)} onPointerMove={followGlow}>
                  <span className="stage-title">{s.title}</span>
                  <span className="stage-desc">{s.desc}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="ghost-name" aria-hidden="true">Uranie</span>
            <p className="r-kicker">Uranie, muse des astres</p>
            <h2>Uranie prépare ses cartes du ciel</h2>
            <p className="r-sub">Voici ce qu'elle t'apportera. Laisse ton email, elle te prévient dès qu'elle ouvre les portes.</p>
            <div className="stages">
              {URANIE_SOON.map((s) => (
                <div key={s.title} className="portal stage is-soon" onPointerMove={followGlow}>
                  <span className="stage-title">{s.title}</span>
                  <span className="stage-desc">{s.desc}</span>
                </div>
              ))}
            </div>
            <Waitlist />
          </>
        )}
        <button className="back" type="button" onClick={onBackToMuses}>
          Revenir aux muses
        </button>
      </div>
    </div>
  );
}
