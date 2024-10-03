export type QuestionType = "text" | "select" | "textarea" | "date";

export interface Question {
  type: QuestionType;
  options: string[]; // Adjusted type for options
  question: string;
}

export interface FormQuestions {
  questions: Question[];
}

export interface FormData {
  id: string;
  createdby: string;
  title: string;
  description: string;
  active: boolean;
  formdata?: FormQuestions | null; // Optional formdata that contains questions
  createdon: string;
  createdbyemail: string;
  createdbyname: string;
  createdbypic: string;
}