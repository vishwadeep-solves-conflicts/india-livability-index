import { CITIES } from "../data/cities";
import { FACTORS } from "../data/factors";
import { score, strengthsAndWeakSpots, type Impact, type Weights } from "../lib/scoring";

type Props = { city: string; position: number; weights: Weights };

export default function CityDetail({ city, position, weights }: Props) {
  const ratings = CITIES[city];
  const { strengths, weak } = strengthsAndWeakSpots(city, weights);
  const chip = (x: Impact, cls: string) => (
    <span className={`chip ${cls}`} key={x.index}>
      {FACTORS[x.index].label}
      <span className="num">{ratings[x.index]}/10</span>
    </span>
  );

  return (
    <div className="detail">
      <h3>
        {city}{" "}
        <span className="hint num">
          #{position} of 20 · {score(ratings, weights).toFixed(1)}
        </span>
      </h3>
      <div className="chips">
        {strengths.length ? strengths.map((x) => chip(x, "pos")) : <span className="note">No standout strengths for this persona.</span>}
      </div>
      <div className="chips">
        {weak.length ? weak.map((x) => chip(x, "neg")) : <span className="note">No major weak spots for this persona.</span>}
      </div>
      <p className="note">
        Green chips are the factors that help this city most for this persona. Red chips hurt it most. Both are compared
        with the 20-city median and scaled by weight.
      </p>
    </div>
  );
}
