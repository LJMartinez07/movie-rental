require('dotenv').config();
module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: 'public',
    database: process.env.DB_DATABASE,
    entities: [process.env.DB_ENTITIES],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/database/migrations',
    },
    synchronize: true,
    logging: true,
  }
]
