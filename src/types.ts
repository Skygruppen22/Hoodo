/**
 * Accounting module types and enums
 */

export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE'
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  description?: string;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  entries: JournalEntry[];
}

export interface JournalEntry {
  accountId: string;
  type: TransactionType;
  amount: number;
}
