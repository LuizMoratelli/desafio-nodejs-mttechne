export type FinancialReleaseType = 'Entrada' | 'Saída';

export type FinancialReleaseModel = {
  id: string;
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
};
