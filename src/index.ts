import { AccountManager } from './account-manager';
import { Ledger } from './ledger';
import { AccountType, TransactionType, Account, Transaction, JournalEntry } from './types';

/**
 * Main Accounting System
 */
export class AccountingSystem {
  private accountManager: AccountManager;
  private ledger: Ledger;

  constructor() {
    this.accountManager = new AccountManager();
    this.ledger = new Ledger(this.accountManager);
  }

  /**
   * Create a new account
   */
  createAccount(name: string, type: AccountType, description?: string): Account {
    return this.accountManager.createAccount(name, type, description);
  }

  /**
   * Get account by ID
   */
  getAccount(id: string): Account | undefined {
    return this.accountManager.getAccount(id);
  }

  /**
   * Get all accounts
   */
  getAllAccounts(): Account[] {
    return this.accountManager.getAllAccounts();
  }

  /**
   * Get accounts by type
   */
  getAccountsByType(type: AccountType): Account[] {
    return this.accountManager.getAccountsByType(type);
  }

  /**
   * Record a transaction
   */
  recordTransaction(description: string, entries: JournalEntry[]): Transaction {
    return this.ledger.recordTransaction(description, entries);
  }

  /**
   * Get all transactions
   */
  getAllTransactions(): Transaction[] {
    return this.ledger.getAllTransactions();
  }

  /**
   * Get transaction by ID
   */
  getTransaction(id: string): Transaction | undefined {
    return this.ledger.getTransaction(id);
  }

  /**
   * Generate a simple balance sheet
   */
  generateBalanceSheet(): {
    assets: Account[];
    liabilities: Account[];
    equity: Account[];
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
  } {
    const assets = this.getAccountsByType(AccountType.ASSET);
    const liabilities = this.getAccountsByType(AccountType.LIABILITY);
    const equity = this.getAccountsByType(AccountType.EQUITY);

    const totalAssets = assets.reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilities = liabilities.reduce((sum, acc) => sum + acc.balance, 0);
    const totalEquity = equity.reduce((sum, acc) => sum + acc.balance, 0);

    return {
      assets,
      liabilities,
      equity,
      totalAssets,
      totalLiabilities,
      totalEquity
    };
  }

  /**
   * Generate a simple income statement
   */
  generateIncomeStatement(): {
    revenue: Account[];
    expenses: Account[];
    totalRevenue: number;
    totalExpenses: number;
    netIncome: number;
  } {
    const revenue = this.getAccountsByType(AccountType.REVENUE);
    const expenses = this.getAccountsByType(AccountType.EXPENSE);

    const totalRevenue = revenue.reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpenses = expenses.reduce((sum, acc) => sum + acc.balance, 0);
    const netIncome = totalRevenue - totalExpenses;

    return {
      revenue,
      expenses,
      totalRevenue,
      totalExpenses,
      netIncome
    };
  }
}

// Export all types and classes
export { AccountType, TransactionType, Account, Transaction, JournalEntry };
