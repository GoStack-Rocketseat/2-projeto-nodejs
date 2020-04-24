// import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface RequestDTO {
  id?: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const categoryRepository = getRepository(Category);

    let categoryObj = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryObj) {
      categoryObj = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryObj);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Insuficient funds');
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryObj.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
