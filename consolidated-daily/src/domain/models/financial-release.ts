export enum FinancialReleaseType {
  'ENTRADA' = 'Entrada',
  'SAIDA' = 'Saída',
}

export type ReportModel = {
  date: string;
  total: number;
};
