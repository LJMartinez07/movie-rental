import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class UserTable1604629503771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchart',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchart',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchart',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchart',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchart',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE users`);
  }
}
