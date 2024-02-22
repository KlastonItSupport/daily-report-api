import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Reports1708112096483 implements MigrationInterface {
  private TABLE_NAME = 'reports';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'professional_email', type: 'varchar' },
          { name: 'company_name', type: 'varchar' },
          { name: 'was_sent', type: 'boolean', default: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
