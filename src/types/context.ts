export type Objective = {
  id?: number;
  label: string;
};

export type Context = {
  id: number;
  name: string;
  description: string;
  school: string;
  country: string;
  level: string;
  subject: string;
  academic_year: string;
  objectives: Objective[];
  twins: number;
};
