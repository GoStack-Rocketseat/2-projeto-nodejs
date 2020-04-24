import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class ModifyCategoryColumnTitle1587442633867
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'categories',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'categories',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isUnique: false,
      }),
    );
  }
}
