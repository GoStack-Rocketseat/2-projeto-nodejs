import fs from 'fs';

import Transaction from '../models/Transaction';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

interface RequestDTO {
  id?: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const importedFilePath = `${uploadConfig.directory}/${filename}`;

    if (!fs.existsSync(importedFilePath)) {
      throw new AppError('File did not uploaded successfully', 406);
    }

    const createTransaction = new CreateTransactionService();
    const transactions: Transaction[] = [];

    const fileContend = fs.readFileSync(importedFilePath, 'utf8');
    const lines = fileContend.split('\n');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) {
        const line = lines[i];

        if (line !== '') {
          const [lineTitle, lineType, lineValue, lineCategory] = line.split(
            ', ',
          );
          const title = lineTitle as string;
          const type = lineType as 'income' | 'outcome';
          const value = parseInt(lineValue, 10) as number;
          const category = lineCategory as string;

          // eslint-disable-next-line no-await-in-loop
          const transaction = await createTransaction.execute({
            title,
            value,
            type,
            category,
          });
          transactions.push(transaction);
        }
      }
    }

    return transactions;
  }
}

export default ImportTransactionsService;
