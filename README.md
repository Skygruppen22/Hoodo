# Hoodo
Regnskap SMB - Accounting System for Small and Medium Businesses

## Overview

Hoodo is a simple, lightweight accounting module for SMB (Small/Medium Business) built with TypeScript. It implements double-entry bookkeeping principles and provides basic financial reporting capabilities.

## Features

- **Double-Entry Bookkeeping**: Ensures all transactions maintain the accounting equation (Assets = Liabilities + Equity)
- **Account Management**: Support for all major account types (Assets, Liabilities, Equity, Revenue, Expenses)
- **Transaction Recording**: Record financial transactions with automatic balance updates
- **Financial Reports**: Generate balance sheets and income statements
- **TypeScript**: Fully typed for better developer experience and code safety

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

### Basic Example

```typescript
import { AccountingSystem, AccountType, TransactionType } from './index';

// Create a new accounting system
const accounting = new AccountingSystem();

// Create accounts
const cash = accounting.createAccount('Kontanter', AccountType.ASSET);
const revenue = accounting.createAccount('Inntekter', AccountType.REVENUE);

// Record a transaction
accounting.recordTransaction('Sales revenue', [
  { accountId: cash.id, type: TransactionType.DEBIT, amount: 5000 },
  { accountId: revenue.id, type: TransactionType.CREDIT, amount: 5000 }
]);

// Generate reports
const balanceSheet = accounting.generateBalanceSheet();
const incomeStatement = accounting.generateIncomeStatement();
```

### Running the Example

```bash
npm run example
```

This will run a complete example demonstrating:
- Account creation
- Recording transactions
- Generating balance sheets
- Generating income statements

## Account Types

- **ASSET**: Resources owned by the business (e.g., cash, inventory)
- **LIABILITY**: Obligations owed by the business (e.g., loans, accounts payable)
- **EQUITY**: Owner's interest in the business
- **REVENUE**: Income from business operations
- **EXPENSE**: Costs of business operations

## API

### AccountingSystem

Main class for interacting with the accounting module.

#### Methods

- `createAccount(name: string, type: AccountType, description?: string): Account`
- `getAccount(id: string): Account | undefined`
- `getAllAccounts(): Account[]`
- `getAccountsByType(type: AccountType): Account[]`
- `recordTransaction(description: string, entries: JournalEntry[]): Transaction`
- `getAllTransactions(): Transaction[]`
- `generateBalanceSheet()`: Generate a balance sheet report
- `generateIncomeStatement()`: Generate an income statement report

## License

ISC

