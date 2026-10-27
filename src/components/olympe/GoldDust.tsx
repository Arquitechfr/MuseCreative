import { useEffect, useRef } from "react";
import { startGoldDust, stopGoldDust } from "../../lib/goldDust";

export default function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    startGoldDust(ref.current);
    return () => stopGoldDust();
  }, []);

  return <canvas ref={ref} className="gold-dust" aria-hidden="true" />;
}
