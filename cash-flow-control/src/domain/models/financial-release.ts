export type FinancialReleaseType = 'Entrada' | 'Saída';

export interface FinancialReleaseModel {
  id: string;
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
}
