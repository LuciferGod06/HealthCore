export type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: "stable" | "review" | "critical";
  lastVisit: string;
  room?: string;
};
