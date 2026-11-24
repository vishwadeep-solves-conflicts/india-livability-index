import type { FactorKey } from "./factors";

export type PersonaId = "it" | "family" | "retire" | "remote";

export type Persona = {
  id: PersonaId;
  name: string;
  /** CSS variable holding the persona's colour (see styles/theme.css). */
  color: string;
  why: string;
  /** Default weights. Factors left out weigh 0. */
  weights: Partial<Record<FactorKey, number>>;
};

export const PERSONAS: Persona[] = [
  {
    id: "it",
    name: "Young IT professional",
    color: "--p-it",
    why: "Career depth, social life and a manageable commute come first.",
    weights: { jobs: 25, housing: 8, costs: 5, air: 5, climate: 4, green: 2, water: 4, clean: 2, net: 5, commute: 10, transit: 5, airport: 4, safety: 5, health: 3, lifestyle: 13 },
  },
  {
    id: "family",
    name: "Family with kids",
    color: "--p-family",
    why: "Safety, schools, clean air and a steady job market for the earning parent.",
    weights: { jobs: 18, housing: 8, costs: 6, air: 8, climate: 4, green: 5, water: 6, clean: 3, net: 2, commute: 7, transit: 3, airport: 2, safety: 12, health: 6, schools: 10 },
  },
  {
    id: "retire",
    name: "Retirees",
    color: "--p-retire",
    why: "Healthcare, a gentle climate, low costs and a calm pace of life.",
    weights: { housing: 8, costs: 10, air: 10, climate: 10, green: 8, water: 6, clean: 5, net: 2, commute: 3, airport: 4, safety: 8, health: 18, lifestyle: 2, pace: 6 },
  },
  {
    id: "remote",
    name: "Remote worker",
    color: "--p-remote",
    why: "Fast internet, low costs, good weather and flights out when needed.",
    weights: { housing: 12, costs: 12, air: 10, climate: 12, green: 6, water: 6, clean: 3, net: 15, transit: 2, airport: 7, safety: 5, health: 4, lifestyle: 6 },
  },
];

export const findPersona = (id: string | null | undefined) => PERSONAS.find((p) => p.id === id);
export const personaColor = (p: Persona) => `var(${p.color})`;
