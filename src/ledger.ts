import { Transaction, JournalEntry, TransactionType, AccountType } from './types';
import { AccountManager } from './account-manager';

/**
 * Ledger - Handles transaction recording and management
 */
export class Ledger {
  private transactions: Transaction[] = [];
  private accountManager: AccountManager;

  constructor(accountManager: AccountManager) {
    this.accountManager = accountManager;
  }

  /**
   * Record a transaction with double-entry bookkeeping
   */
  recordTransaction(description: string, entries: JournalEntry[]): Transaction {
    // Validate double-entry bookkeeping
    this.validateEntries(entries);

    const transaction: Transaction = {
      id: this.generateId(),
      date: new Date(),
      description,
      entries
    };

    // Update account balances
    for (const entry of entries) {
      const account = this.accountManager.getAccount(entry.accountId);
      if (!account) {
        throw new Error(`Account ${entry.accountId} not found`);
      }

      // Apply the entry based on account type and transaction type
      const balanceChange = this.calculateBalanceChange(account.type, entry.type, entry.amount);
      this.accountManager.updateBalance(entry.accountId, balanceChange);
    }

    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Get all transactions
   */
  getAllTransactions(): Transaction[] {
    return [...this.transactions];
  }

  /**
   * Get transaction by ID
   */
  getTransaction(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  /**
   * Validate that debits equal credits
   */
  private validateEntries(entries: JournalEntry[]): void {
    if (entries.length < 2) {
      throw new Error('A transaction must have at least 2 entries');
    }

    let debitTotal = 0;
    let creditTotal = 0;

    for (const entry of entries) {
      if (entry.amount <= 0) {
        throw new Error('Entry amount must be positive');
      }
      if (entry.type === TransactionType.DEBIT) {
        debitTotal += entry.amount;
      } else {
        creditTotal += entry.amount;
      }
    }

    if (Math.abs(debitTotal - creditTotal) > 0.001) {
      throw new Error(`Debits (${debitTotal}) must equal credits (${creditTotal})`);
    }
  }

  /**
   * Calculate balance change based on account type and transaction type
   */
  private calculateBalanceChange(accountType: AccountType, transactionType: TransactionType, amount: number): number {
    // Assets and Expenses increase with debits
    // Liabilities, Equity, and Revenue increase with credits
    const increaseWithDebit = accountType === AccountType.ASSET || accountType === AccountType.EXPENSE;
    
    if (increaseWithDebit) {
      return transactionType === TransactionType.DEBIT ? amount : -amount;
    } else {
      return transactionType === TransactionType.CREDIT ? amount : -amount;
    }
  }

  private generateId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}
