import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MovieTable1604630405611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movies',
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
                        type: 'varchart',
                        isNullable: false,
                    },


                    {
                        name: 'poster_path',
                        type: 'varchart',
                        isNullable: false,
                    },
                    {
                        name: 'sale_price',
                        type: 'double',
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
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE movies`);
    }

}
