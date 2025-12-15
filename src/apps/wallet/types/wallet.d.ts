export interface WalletRecord {
  PK: string;
  SK: "WALLET";

  userId: string;
  balance: number;

  currency?: string;

  createdAt?: string;
  updatedAt?: string;
}
