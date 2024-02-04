export type FetchUserAccountsAttribute = {
  cifId: string;
};
export type FetchUserAccountsResponse = {
  customerId: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  currencyCode: string;
  balance: number;
  formatedBalance: string;
  schemeType: string;
  schemeCode: string;
};

export type FetchUserByAcctNumberAttribute = {acctNo: string};
export type FetchUserByAcctNumberResponse = {
  customerId: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  freezeCode: string;
  productCode: string;
  product: string;
  accountStatus: string;
  currencyCode: string;
  branchCode: string;
  branch: string;
  bookBalance: number;
  availableBalance: number;
  lienAmount: number;
  unclearedBalance: number;
  clearedBalance: number;
  mobileNo: string;
  email: string;
  isoCode: string | null;
  relationshipManagerId: string | null;
  bvn: string | null;
  kycLevel: string;
  dob: string | null;
  effectiveavail: number;
  formattedEffAvailBal: string;
  errorDetail: string | null;
};
