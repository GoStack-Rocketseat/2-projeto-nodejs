import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateForeignKey1587436708654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // eslint-disable-next-line no-unused-expressions
    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'varchar',
      }),
    );
  }
}
