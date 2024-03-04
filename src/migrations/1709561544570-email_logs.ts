import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EmailLogs1709561544570 implements MigrationInterface {
  private TABLE_NAME = 'email_logs';

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
          { name: 'service_info_id', type: 'varchar' },
          {
            name: 'emails',
            type: 'varchar',
          },
          {
            name: 'rejecteds',
            type: 'varchar',
          },
          {
            name: 'sent_successfully',
            type: 'tinyint',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
