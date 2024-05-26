export interface Question {
  text: string;
  options: string | string[];
  conditionalQuestions?: { [answer: string]: Question[] };
}

export interface Section {
  name: string;
  questions: Question[];
}
