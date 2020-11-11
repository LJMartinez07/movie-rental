import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class MovieImagesTable1604633019444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(new Table({
      name: 'movie_images',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'movie_id',
          type: 'int',
        },
        {
          name: 'path',
          type: 'varchar',
          isNullable: false,
        },
      ],
    }));


    await queryRunner.createForeignKey(
      'movie_images',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
        onDelete: 'CASCADE',
      }),
    );


    await queryRunner.query("CREATE TABLE `movie_likes`(`id` int NOT NULL AUTO_INCREMENT,`movie_id` int NOT NULL,`user_id` int NOT NULL,`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),PRIMARY KEY(`id`),UNIQUE KEY `IDX_713b139e9e925987dc8ae1d5ba`(`movie_id`, `user_id`),KEY `FK_e1cbf8ff3b2c6b4102b5938d417`(`user_id`),CONSTRAINT `FK_3bc8eda4c33e53316619d61d7d4` FOREIGN KEY(`movie_id`) REFERENCES `movie`(`id`),CONSTRAINT `FK_e1cbf8ff3b2c6b4102b5938d417` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`))")
    await queryRunner.query("CREATE TABLE `movie_logs`(`id` int NOT NULL AUTO_INCREMENT,`title` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`sale_price` float NOT NULL,`rental_price` float NOT NULL,`movie_id` int NOT NULL,`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),`updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),PRIMARY KEY(`id`),KEY `FK_c63bd816b1348ce6e6e3fd0f139`(`movie_id`),CONSTRAINT `FK_c63bd816b1348ce6e6e3fd0f139` FOREIGN KEY(`movie_id`) REFERENCES `movie`(`id`))")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query("ALTER TABLE `movie_likes` DROP CONSTRAINT `FK_3bc8eda4c33e53316619d61d7d4`");
    await queryRunner.query("ALTER TABLE `movie_likes` DROP CONSTRAINT `FK_e1cbf8ff3b2c6b4102b5938d417`");
    await queryRunner.query(
      "ALTER TABLE `movie_logs` DROP CONSTRAINT `FK_c63bd816b1348ce6e6e3fd0f139`",
    );
    queryRunner.query("DROP TABLE `movie_images`");
    await queryRunner.query("DROP TABLE `movie_like`");
    await queryRunner.query("DROP TABLE `movie_logs`");
  }
}
