import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MovieTable1604630405611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sale_price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'on_rent',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'rental_price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'stock',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'availability',
            type: 'boolean',
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





    await queryRunner.query(`CREATE TABLE "order"(
      "id" int NOT NULL AUTO_INCREMENT,
      "movie_id" int NOT NULL,
      "user_id" int NOT NULL,
      "quantity" int NOT NULL,
      "total" float NOT NULL,
      "created_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      "updated_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      "movieId" int DEFAULT NULL,
      "userId" int DEFAULT NULL,
      PRIMARY KEY("id"),
      KEY "FK_9c1df46440b41d8af8024f3d24f"("movieId"),
      KEY "FK_caabe91507b3379c7ba73637b84"("userId"),
      CONSTRAINT "FK_9c1df46440b41d8af8024f3d24f" FOREIGN KEY("movieId") REFERENCES "movie"("id"),
      CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY("userId") REFERENCES "user"("id")
    )`)

    await queryRunner.query(`CREATE TABLE "rental"(
      "id" int NOT NULL AUTO_INCREMENT,
      "user_id" int NOT NULL,
      "movie_id" int NOT NULL,
      "total" float NOT NULL,
      "rented_at" timestamp NOT NULL,
      "returned_at" timestamp NOT NULL,
      "created_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      "updated_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY("id"),
      KEY "FK_578fc4afd5c30f1b0e309adb259"("movie_id"),
      CONSTRAINT "FK_578fc4afd5c30f1b0e309adb259" FOREIGN KEY("movie_id") REFERENCES "movie"("id")
    )`)

    await queryRunner.query(`CREATE TABLE "return"(
      "id" int NOT NULL AUTO_INCREMENT,
      "rental_id" int NOT NULL,
      "penalty" float NOT NULL DEFAULT '0',
      "created_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      "updated_at" datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY("id"),
      UNIQUE KEY "REL_eecbc6a49bd9616dc691521143"("rental_id"),
      CONSTRAINT "FK_eecbc6a49bd9616dc6915211434" FOREIGN KEY("rental_id") REFERENCES "rental"("id")
    )`)



  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE movies`);
    await queryRunner.query(
      `ALTER TABLE "return" DROP CONSTRAINT "FK_eecbc6a49bd9616dc6915211434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_578fc4afd5c30f1b0e309adb259"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9c1df46440b41d8af8024f3d24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(`DROP TABLE "return"`);
    await queryRunner.query(`DROP TABLE "rental"`);
    await queryRunner.query(`DROP TABLE "order"`);

  }
}
