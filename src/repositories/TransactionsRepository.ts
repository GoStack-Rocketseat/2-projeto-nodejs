import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactions = await this.find();

    await transactions.map(transaction => {
      balance.income += transaction.type === 'income' ? transaction.value : 0;
      balance.outcome += transaction.type === 'outcome' ? transaction.value : 0;
      balance.total = balance.income - balance.outcome;

      return 0;
    });

    return balance;
  }
}

export default TransactionsRepository;
