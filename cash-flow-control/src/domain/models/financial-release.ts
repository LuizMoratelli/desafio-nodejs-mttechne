export enum FinancialReleaseType {
  'ENTRADA' = 'Entrada',
  'SAIDA' = 'Saída',
}

export type FinancialReleaseModel = {
  id: string;
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
};
