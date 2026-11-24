import { forwardRef, type CSSProperties } from "react";
import SectionHead from "./SectionHead";
import PersonaTabs from "./PersonaTabs";
import RankingPanel from "./RankingPanel";
import WeightsPanel from "./WeightsPanel";
import { findPersona, personaColor, type PersonaId } from "../data/personas";
import type { Weights } from "../lib/scoring";

type Props = {
  active: PersonaId;
  weights: Weights;
  selected: string;
  onSelectPersona: (id: PersonaId) => void;
  onSelectCity: (city: string) => void;
  onWeightChange: (index: number, value: number) => void;
  onReset: () => void;
};

/** Persona tabs, the live ranking with city details, and the weight sliders. */
const Workbench = forwardRef<HTMLElement, Props>(function Workbench(props, ref) {
  const persona = findPersona(props.active)!;
  return (
    <section id="workbench" ref={ref}>
      <SectionHead title="Ranking workbench">
        Pick a persona, then drag the weights to match your own priorities. Arrows show how far a city has moved from the
        default ranking. Select a city to see its strengths and weak spots.
      </SectionHead>
      <PersonaTabs active={props.active} onSelect={props.onSelectPersona} />
      <div className="bench" style={{ "--pc": personaColor(persona) } as CSSProperties}>
        <RankingPanel persona={persona} weights={props.weights} selected={props.selected} onSelect={props.onSelectCity} />
        <WeightsPanel persona={persona} weights={props.weights} onChange={props.onWeightChange} onReset={props.onReset} />
      </div>
    </section>
  );
});

export default Workbench;
