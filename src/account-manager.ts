import { Account, AccountType } from './types';

/**
 * Account Manager - Handles account creation and management
 */
export class AccountManager {
  private accounts: Map<string, Account> = new Map();

  /**
   * Create a new account
   */
  createAccount(name: string, type: AccountType, description?: string): Account {
    const id = this.generateId();
    const account: Account = {
      id,
      name,
      type,
      balance: 0,
      description
    };
    this.accounts.set(id, account);
    return account;
  }

  /**
   * Get account by ID
   */
  getAccount(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  /**
   * Get all accounts
   */
  getAllAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }

  /**
   * Get accounts by type
   */
  getAccountsByType(type: AccountType): Account[] {
    return this.getAllAccounts().filter(account => account.type === type);
  }

  /**
   * Update account balance
   */
  updateBalance(accountId: string, amount: number): void {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account ${accountId} not found`);
    }
    account.balance += amount;
  }

  private generateId(): string {
    return `acc_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}
