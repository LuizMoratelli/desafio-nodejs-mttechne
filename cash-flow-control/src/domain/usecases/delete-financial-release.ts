export type DeleteFinancialReleaseModel = {
  id: string;
};

export interface DeleteFinancialRelease {
  delete: (financialRelease: DeleteFinancialReleaseModel) => Promise<void>;
}
