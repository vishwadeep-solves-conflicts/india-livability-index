import type { CSSProperties } from "react";
import SectionHead from "./SectionHead";
import { PERSONAS, personaColor } from "../data/personas";
import { ranksByPersona } from "../lib/scoring";

const ROWS = ranksByPersona();

export default function CompareTable() {
  return (
    <section>
      <SectionHead title="Rank by persona">
        Each city's rank under all four personas' default weights. Cities are sorted by average rank. Highlighted cells are
        top-5 finishes.
      </SectionHead>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>City</th>
              {PERSONAS.map((p) => (
                <th key={p.id} style={{ color: personaColor(p) }}>
                  {p.name}
                </th>
              ))}
              <th>Avg rank</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.city}>
                <td>{row.city}</td>
                {row.ranks.map((rank, i) => (
                  <td key={PERSONAS[i].id}>
                    <span className={`rk ${rank <= 5 ? "top" : ""}`} style={{ "--pc": personaColor(PERSONAS[i]) } as CSSProperties}>
                      {rank}
                    </span>
                  </td>
                ))}
                <td className="num">{row.average.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
