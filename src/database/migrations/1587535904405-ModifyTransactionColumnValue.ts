import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class ModifyTransactionColumnValue1587535904405
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'transactions',
      'value',
      new TableColumn({
        name: 'value',
        type: 'numeric(10,2)',
      }),
    );
  }
}
