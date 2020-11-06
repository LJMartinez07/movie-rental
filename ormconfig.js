require('dotenv').config();

module.exports = [
    {
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT, 3306),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        schema: 'public',
        migrationsTableName: "custom_migration_table",
        database: process.env.TYPEORM_DATABASE,
        entities: [process.env.TYPEORM_ENTITIES],
        migrations: ['"dist/migrations/*{.ts,.js}"'],
        synchronize: true,
        logging: true,
    },
];