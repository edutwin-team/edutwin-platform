export type DashboardCounts = {
  contexts: number;
  twins: number;
  quizzes: number;
  simulations: number;
};

export type WeeklySimulation = {
  day: string;
  count: number;
};

export type LastTwin = {
  id: number;
  name: string;
  description: string | null;
  average_grade: number;
};

export type DashboardResponse = {
  counts: DashboardCounts;
  last_7_days_total: number;
  weekly_simulations: WeeklySimulation[];
  last_twins: LastTwin[];
};
