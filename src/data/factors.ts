// The 17 factors every city is rated on, in the order the ratings in cities.ts use.
export const FACTORS = [
  { key: "jobs", label: "Tech job market" },
  { key: "housing", label: "Housing affordability" },
  { key: "costs", label: "Daily cost of living" },
  { key: "air", label: "Air quality" },
  { key: "climate", label: "Climate comfort" },
  { key: "green", label: "Green cover" },
  { key: "water", label: "Water & power supply" },
  { key: "clean", label: "Cleanliness" },
  { key: "net", label: "Internet quality" },
  { key: "commute", label: "Commute ease" },
  { key: "transit", label: "Public transport" },
  { key: "airport", label: "Airport access" },
  { key: "safety", label: "Safety" },
  { key: "health", label: "Healthcare" },
  { key: "schools", label: "Schools" },
  { key: "lifestyle", label: "Lifestyle & social scene" },
  { key: "pace", label: "Calm pace of life" },
] as const;

export type FactorKey = (typeof FACTORS)[number]["key"];

export const FACTOR_KEYS: FactorKey[] = FACTORS.map((f) => f.key);
