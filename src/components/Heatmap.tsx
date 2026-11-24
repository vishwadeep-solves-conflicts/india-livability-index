import SectionHead from "./SectionHead";
import { CITIES } from "../data/cities";
import { FACTORS } from "../data/factors";

const cellBg = (v: number) => `color-mix(in oklab, var(--heat) ${Math.round(((v - 1) / 9) * 85)}%, var(--surface))`;
const cellFg = (v: number) => (v >= 7 ? "var(--surface)" : "var(--ink)");

/** Every factor rating for every city. */
export default function Heatmap() {
  return (
    <section>
      <SectionHead title="Factor scores">
        Each city is rated from 1 to 10 on every factor, where 10 is best. For housing and daily costs, 10 means most
        affordable. For pace of life, 10 means calmest.
      </SectionHead>
      <div className="legend">
        <span>Worse</span>
        <span className="ramp">
          {[1, 3, 5, 7, 10].map((v) => (
            <span key={v} style={{ background: cellBg(v), color: cellFg(v) }}>
              {v}
            </span>
          ))}
        </span>
        <span>Better</span>
      </div>
      <div className="scroll">
        <table className="heat">
          <thead>
            <tr>
              <th>City</th>
              {FACTORS.map((f) => (
                <th className="v" key={f.key}>
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(CITIES).map(([city, ratings]) => (
              <tr key={city}>
                <td>{city}</td>
                {ratings.map((x, i) => (
                  <td
                    key={FACTORS[i].key}
                    className="h"
                    style={{ background: cellBg(x), color: cellFg(x) }}
                    title={`${city} · ${FACTORS[i].label}: ${x}/10`}
                  >
                    {x}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
