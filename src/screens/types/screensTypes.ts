export interface Transaction {
  amount: number;
  bank: string;
  name: string;
  time: string;
}

export interface AccountDetails {
  accountType: string;
  availableBalance: number;
  currency: string;
  dateAdded: string;
  transactions: Transaction[];
}
