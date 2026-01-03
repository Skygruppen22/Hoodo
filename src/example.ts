import { AccountingSystem, AccountType, TransactionType } from './index';

/**
 * Example usage of the Hoodo Accounting System
 */
function runExample() {
  // Create a new accounting system instance
  const accounting = new AccountingSystem();

  console.log('=== Hoodo Accounting System Example ===\n');

  // Create accounts
  console.log('Creating accounts...');
  const cash = accounting.createAccount('Kontanter', AccountType.ASSET, 'Bank account');
  const revenue = accounting.createAccount('Inntekter', AccountType.REVENUE, 'Sales revenue');
  const expenses = accounting.createAccount('Utgifter', AccountType.EXPENSE, 'Operating expenses');
  const equity = accounting.createAccount('Egenkapital', AccountType.EQUITY, 'Owner equity');

  console.log(`Created ${accounting.getAllAccounts().length} accounts\n`);

  // Record initial equity
  console.log('Recording initial equity of 10,000 kr...');
  accounting.recordTransaction('Initial equity investment', [
    { accountId: cash.id, type: TransactionType.DEBIT, amount: 10000 },
    { accountId: equity.id, type: TransactionType.CREDIT, amount: 10000 }
  ]);

  // Record revenue
  console.log('Recording revenue of 5,000 kr...');
  accounting.recordTransaction('Sales revenue', [
    { accountId: cash.id, type: TransactionType.DEBIT, amount: 5000 },
    { accountId: revenue.id, type: TransactionType.CREDIT, amount: 5000 }
  ]);

  // Record expense
  console.log('Recording expense of 2,000 kr...');
  accounting.recordTransaction('Office supplies', [
    { accountId: expenses.id, type: TransactionType.DEBIT, amount: 2000 },
    { accountId: cash.id, type: TransactionType.CREDIT, amount: 2000 }
  ]);

  // Generate reports
  console.log('\n=== Balance Sheet ===');
  const balanceSheet = accounting.generateBalanceSheet();
  console.log('\nAssets:');
  balanceSheet.assets.forEach(acc => {
    console.log(`  ${acc.name}: ${acc.balance.toFixed(2)} kr`);
  });
  console.log(`Total Assets: ${balanceSheet.totalAssets.toFixed(2)} kr`);

  console.log('\nLiabilities:');
  console.log(`Total Liabilities: ${balanceSheet.totalLiabilities.toFixed(2)} kr`);

  console.log('\nEquity:');
  balanceSheet.equity.forEach(acc => {
    console.log(`  ${acc.name}: ${acc.balance.toFixed(2)} kr`);
  });
  console.log(`Total Equity: ${balanceSheet.totalEquity.toFixed(2)} kr`);

  console.log('\n=== Income Statement ===');
  const incomeStatement = accounting.generateIncomeStatement();
  console.log('\nRevenue:');
  incomeStatement.revenue.forEach(acc => {
    console.log(`  ${acc.name}: ${acc.balance.toFixed(2)} kr`);
  });
  console.log(`Total Revenue: ${incomeStatement.totalRevenue.toFixed(2)} kr`);

  console.log('\nExpenses:');
  incomeStatement.expenses.forEach(acc => {
    console.log(`  ${acc.name}: ${acc.balance.toFixed(2)} kr`);
  });
  console.log(`Total Expenses: ${incomeStatement.totalExpenses.toFixed(2)} kr`);
  console.log(`Net Income: ${incomeStatement.netIncome.toFixed(2)} kr`);

  console.log('\n=== Transaction History ===');
  const transactions = accounting.getAllTransactions();
  console.log(`Total transactions: ${transactions.length}`);
  transactions.forEach((txn, index) => {
    console.log(`\n${index + 1}. ${txn.description} (${txn.date.toISOString().split('T')[0]})`);
    txn.entries.forEach(entry => {
      const account = accounting.getAccount(entry.accountId);
      console.log(`   ${entry.type}: ${account?.name} - ${entry.amount.toFixed(2)} kr`);
    });
  });
}

// Run the example
if (require.main === module) {
  runExample();
}

export { runExample };
