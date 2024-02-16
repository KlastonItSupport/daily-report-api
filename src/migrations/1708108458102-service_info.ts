import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ServiceInfo1708108458102 implements MigrationInterface {
  private TABLE_NAME = 'services_info';

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
          {
            name: 'professional_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'professional_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'client_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'client_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'service_type',
            type: 'tinyint',
            isNullable: true,
          },
          {
            name: 'service_price',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'executed_service',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'pendencies',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'planning',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'professional_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_Client',
            columnNames: ['client_id'],
            referencedTableName: 'clients', // nome da tabela referenciada
            referencedColumnNames: ['id'], // nome da coluna referenciada
          },
          {
            name: 'FK_Professional',
            columnNames: ['professional_id'],
            referencedTableName: 'professionals', // nome da tabela referenciada
            referencedColumnNames: ['id'], // nome da coluna referenciada
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
