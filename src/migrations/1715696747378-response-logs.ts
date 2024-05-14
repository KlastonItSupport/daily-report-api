import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ResponseLogs1715696747378 implements MigrationInterface {
  private TABLE_NAME = 'responses_logs';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'headers', type: 'longtext' },
          { name: 'body', type: 'longtext' },
          { name: 'route', type: 'varchar' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
