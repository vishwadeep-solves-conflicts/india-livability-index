import { useEffect, useRef, useState } from "react";
import AppBar from "./shared/AppBar";
import Intro from "./components/Intro";
import PersonaCards from "./components/PersonaCards";
import Workbench from "./components/Workbench";
import CompareTable from "./components/CompareTable";
import Heatmap from "./components/Heatmap";
import MethodNotes from "./components/MethodNotes";
import { PERSONAS, findPersona, type PersonaId } from "./data/personas";
import { DEFAULT_RANKING, DEFAULT_WEIGHTS, type Weights } from "./lib/scoring";

const PERSONA_KEY = "livability-persona";

function startingPersona(): PersonaId {
  let start: PersonaId = "it";
  try {
    const saved = findPersona(localStorage.getItem(PERSONA_KEY));
    if (saved) start = saved.id;
  } catch {
    // storage blocked
  }
  // a link like #retire opens that persona
  const fromHash = findPersona(window.location.hash.slice(1));
  if (fromHash) start = fromHash.id;
  return start;
}

const freshWeights = () =>
  Object.fromEntries(PERSONAS.map((p) => [p.id, DEFAULT_WEIGHTS[p.id].slice()])) as Record<PersonaId, Weights>;

export default function App() {
  const [active, setActive] = useState<PersonaId>(startingPersona);
  const [weights, setWeights] = useState(freshWeights);
  const [selected, setSelected] = useState<string>(() => DEFAULT_RANKING[active][0].city);
  const workbenchRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PERSONA_KEY, active);
    } catch {
      // storage blocked
    }
  }, [active]);

  const openPersona = (id: PersonaId) => {
    setActive(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    workbenchRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const setWeight = (index: number, value: number) =>
    setWeights((all) => {
      const next = all[active].slice();
      next[index] = value;
      return { ...all, [active]: next };
    });

  const resetWeights = () => setWeights((all) => ({ ...all, [active]: DEFAULT_WEIGHTS[active].slice() }));

  return (
    <>
      <AppBar title="India City Livability Index" />
      <div className="wrap">
        <Intro />
        <PersonaCards onOpen={openPersona} />
        <Workbench
          ref={workbenchRef}
          active={active}
          weights={weights[active]}
          selected={selected}
          onSelectPersona={setActive}
          onSelectCity={setSelected}
          onWeightChange={setWeight}
          onReset={resetWeights}
        />
        <CompareTable />
        <Heatmap />
        <MethodNotes />
      </div>
    </>
  );
}
