import { CITIES } from "../data/cities";
import { FACTOR_KEYS } from "../data/factors";
import { PERSONAS, type PersonaId } from "../data/personas";

export type Weights = number[];
export type Ranked = { city: string; score: number };

/** Weighted average of a city's 1–10 ratings, scaled to 100. */
export function score(ratings: number[], weights: Weights): number {
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  return (ratings.reduce((s, v, i) => s + v * weights[i], 0) / total) * 10;
}

/** Every city, best first. */
export function ranking(weights: Weights): Ranked[] {
  return Object.entries(CITIES)
    .map(([city, ratings]) => ({ city, score: score(ratings, weights) }))
    .sort((a, b) => b.score - a.score);
}

export const DEFAULT_WEIGHTS: Record<PersonaId, Weights> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, FACTOR_KEYS.map((k) => p.weights[k] ?? 0)])
) as Record<PersonaId, Weights>;

export const DEFAULT_RANKING: Record<PersonaId, Ranked[]> = Object.fromEntries(
  PERSONAS.map((p) => [p.id, ranking(DEFAULT_WEIGHTS[p.id])])
) as Record<PersonaId, Ranked[]>;

/** The 20-city median rating of each factor. */
export const MEDIANS: number[] = FACTOR_KEYS.map((_, i) => {
  const sorted = Object.values(CITIES)
    .map((c) => c[i])
    .sort((x, y) => x - y);
  return (sorted[9] + sorted[10]) / 2;
});

export type Impact = { index: number; delta: number };

/**
 * The factors that help and hurt a city most for these weights:
 * weight × distance from the 20-city median.
 */
export function strengthsAndWeakSpots(city: string, weights: Weights): { strengths: Impact[]; weak: Impact[] } {
  const ratings = CITIES[city];
  const impact = FACTOR_KEYS.map((_, i) => ({ index: i, delta: (ratings[i] - MEDIANS[i]) * weights[i] })).filter(
    (x) => weights[x.index] > 0
  );
  return {
    strengths: impact.filter((x) => x.delta > 0).sort((a, b) => b.delta - a.delta).slice(0, 4),
    weak: impact.filter((x) => x.delta < 0).sort((a, b) => a.delta - b.delta).slice(0, 3),
  };
}

/** Each city's rank under every persona's default weights, sorted by average rank. */
export function ranksByPersona(): { city: string; ranks: number[]; average: number }[] {
  return Object.keys(CITIES)
    .map((city) => {
      const ranks = PERSONAS.map((p) => DEFAULT_RANKING[p.id].findIndex((x) => x.city === city) + 1);
      const sum = ranks.reduce((s, x) => s + x, 0);
      return { city, ranks, sum, average: sum / ranks.length };
    })
    .sort((a, b) => a.sum - b.sum);
}
