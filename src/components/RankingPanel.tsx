import CityDetail from "./CityDetail";
import type { Persona } from "../data/personas";
import { DEFAULT_RANKING, DEFAULT_WEIGHTS, ranking, type Weights } from "../lib/scoring";

type Props = { persona: Persona; weights: Weights; selected: string; onSelect: (city: string) => void };

export default function RankingPanel({ persona, weights, selected, onSelect }: Props) {
  const ranked = ranking(weights);
  const defaultPos = Object.fromEntries(DEFAULT_RANKING[persona.id].map((x, i) => [x.city, i]));
  const changed = weights.some((v, i) => v !== DEFAULT_WEIGHTS[persona.id][i]);

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>{persona.name}</h3>
        <span className="hint">{changed ? "Custom weights" : "Default weights"}</span>
      </div>
      <div className="rank">
        {ranked.map((x, i) => {
          const moved = defaultPos[x.city] - i;
          return (
            <button className="row" type="button" key={x.city} aria-pressed={x.city === selected} onClick={() => onSelect(x.city)}>
              <span className="pos">{i + 1}</span>
              <span className="name">
                {x.city}
                {moved > 0 && (
                  <span className="move up" title={`Up ${moved} from default`}>
                    ▲{moved}
                  </span>
                )}
                {moved < 0 && (
                  <span className="move down" title={`Down ${-moved} from default`}>
                    ▼{-moved}
                  </span>
                )}
              </span>
              <span className="track">
                <span className="fill" style={{ width: `${x.score.toFixed(1)}%` }} />
              </span>
              <span className="sc">{x.score.toFixed(1)}</span>
            </button>
          );
        })}
      </div>
      <CityDetail city={selected} position={ranked.findIndex((x) => x.city === selected) + 1} weights={weights} />
    </div>
  );
}
