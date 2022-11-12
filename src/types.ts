export interface querySubNodeI {
  subQuestion: string;
  subQuestionKeyword: string;
  subAnswer: string;
  top5List: { first: string; second: string }[];
}
export interface queryI {
  query: string;
  finalAnswer: string;
  finalExplanation: string;
  stepCount: number;
  nodeList: querySubNodeI[];
}

export interface resultI {
  query: string;
  finalAnswer: string;
  finalExplanation: string;
  stepCount: number;
  nodeList: (querySubNodeI & {
    subAnswerRating: number;
    subAnswerAlt: string;
  })[];
  finalAnswerRating: number | string;
  finalAnswerAlt: string | number;
}
