import { FACTORS } from "../data/factors";
import type { Persona } from "../data/personas";
import { DEFAULT_WEIGHTS, type Weights } from "../lib/scoring";

type Props = { persona: Persona; weights: Weights; onChange: (index: number, value: number) => void; onReset: () => void };

export default function WeightsPanel({ persona, weights, onChange, onReset }: Props) {
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  // biggest default weights first, so the order doesn't jump while dragging
  const defaults = DEFAULT_WEIGHTS[persona.id];
  const order = FACTORS.map((_, i) => i).sort((a, b) => defaults[b] - defaults[a]);

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Weights</h3>
        <button className="btn" type="button" onClick={onReset}>
          Reset to defaults
        </button>
      </div>
      <p className="hint">Each slider runs from 0 to 30. The percentage shows that factor's share of the total weight.</p>
      <div className="weights">
        {order.map((i) => {
          const f = FACTORS[i];
          return (
            <div className={`w ${weights[i] ? "" : "zero"}`} key={f.key}>
              <label htmlFor={`w-${f.key}`}>{f.label}</label>
              <input
                type="range"
                id={`w-${f.key}`}
                min={0}
                max={30}
                step={1}
                value={weights[i]}
                onChange={(e) => onChange(i, Number(e.target.value))}
              />
              <span className="pct">{Math.round((weights[i] / total) * 100)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
