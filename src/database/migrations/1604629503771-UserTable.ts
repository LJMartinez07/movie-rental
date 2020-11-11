import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class UserTable1604629503771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'reset_password_token',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'reset_passwor_token_expires_in',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.query(`CREATE TABLE "auth"(
      "id" int NOT NULL AUTO_INCREMENT,
      "user_id" int NOT NULL,
      "access_token" varchar(255) NOT NULL,
      "refresh_token" varchar(255) NOT NULL,
      "refresh_expires_at" timestamp NOT NULL,
      "created_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      "updated_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY("id"),
      KEY "FK_9922406dc7d70e20423aeffadf3"("user_id"),
      CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY("user_id") REFERENCES "user"("id")
    )`)


    await queryRunner.query(
      `CREATE TABLE "role" (
        "id" int NOT NULL AUTO_INCREMENT,
        "label" varchar(255) NOT NULL,
        PRIMARY KEY ("id"),
        UNIQUE KEY "IDX_6194356fbe60fc21663ecfdf86" ("label")
      ) `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" (
        "userId" int NOT NULL,
        "roleId" int NOT NULL,
        PRIMARY KEY ("userId","roleId"),
        KEY "IDX_5f9286e6c25594c6b88c108db7" ("userId"),
        KEY "IDX_4be2f7adf862634f5f803d246b" ("roleId"),
        CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
      )`,
    );




  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );

    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`,
    );
    queryRunner.query(`DROP TABLE auth`);
    queryRunner.query(`DROP TABLE users`);
    queryRunner.query(`DROP TABLE user_roles_role`);
  }
}
