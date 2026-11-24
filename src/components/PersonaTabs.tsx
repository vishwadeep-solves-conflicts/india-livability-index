import type { CSSProperties } from "react";
import { PERSONAS, personaColor, type PersonaId } from "../data/personas";

export default function PersonaTabs({ active, onSelect }: { active: PersonaId; onSelect: (id: PersonaId) => void }) {
  return (
    <div className="tabs" role="tablist">
      {PERSONAS.map((p) => (
        <button
          key={p.id}
          className="tab"
          role="tab"
          id={`tab-${p.id}`}
          type="button"
          aria-selected={p.id === active}
          style={{ "--pc": personaColor(p) } as CSSProperties}
          onClick={() => onSelect(p.id)}
        >
          <span className="dot" />
          {p.name}
        </button>
      ))}
    </div>
  );
}
