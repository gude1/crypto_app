export type LocalTransferDetail = {
  transactionReference: string;
  transactionDate: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  amount: number;
  narration?: string; // Optional field
};

export type LocalAccountCredited = {
  accountCredited: string | null;
  beneficiaryName: string | null;
  transactionAmount: number | null;
  transactionDate: string | null;
  transactionReference: string | null;
  transactionAmountInWords: string | null;
  transactionId: string | null;
  paymentReference: string | null;
};

export type MakeLocalBankTransferAttributes = {
  accountToDebit: string;
  userName: string;
  channel: string;
  transactionLocation: string;
  sourceAccount: string;
  transferDetails: LocalTransferDetail[];
};

export type MakeLocalBankTransferResponse = {
  accountDebited: string | null;
  senderName: string | null;
  accountsCredited: LocalAccountCredited[] | null;
};

export type GetTransactionReceiptAttributes = {
  TransactionRef: string;
  DebitAccountNo: string;
  Amount: string;
};

export type GetTransactionReceiptResponse = String;
