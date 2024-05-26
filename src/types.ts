// types.ts
export interface Option {
  value: string;
  label: string;
}

export interface Question {
  text: string;
  options: Option[] | string | string[];
  conditionalQuestions?: { [answer: string]: Question[] };
}

export interface Section {
  name: string;
  questions: Question[];
}
