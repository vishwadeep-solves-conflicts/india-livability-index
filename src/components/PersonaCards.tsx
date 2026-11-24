import type { CSSProperties } from "react";
import SectionHead from "./SectionHead";
import { PERSONAS, personaColor, type PersonaId } from "../data/personas";
import { DEFAULT_RANKING } from "../lib/scoring";

/** The top five cities for each persona's default weights. */
export default function PersonaCards({ onOpen }: { onOpen: (id: PersonaId) => void }) {
  return (
    <section>
      <SectionHead title="Top picks by persona">
        The top five cities under each persona's default weights. Open a persona to see the full ranking and change its
        weights.
      </SectionHead>
      <div className="cards">
        {PERSONAS.map((p) => (
          <div className="card" key={p.id} style={{ "--pc": personaColor(p) } as CSSProperties}>
            <div className="who">{p.name}</div>
            <p className="why">{p.why}</p>
            <ol>
              {DEFAULT_RANKING[p.id].slice(0, 5).map((r, i) => (
                <li key={r.city}>
                  <span>
                    <span className="r">{i + 1}</span>
                    <b>{r.city}</b>
                  </span>
                  <span className="num">{r.score.toFixed(1)}</span>
                </li>
              ))}
            </ol>
            <button className="btn" type="button" onClick={() => onOpen(p.id)}>
              See full ranking
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
