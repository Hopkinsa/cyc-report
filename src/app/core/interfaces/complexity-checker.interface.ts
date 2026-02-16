export interface CCFunctionComplexity {
  name: string;
  complexity: number;
  line: number;
};

export interface CCFile {
  index?: number;
  file: string;
  functionComplexities: CCFunctionComplexity[];
  complexityLevel: string;
  complexitySum: number;
};

export type CCReport = CCFile[];
