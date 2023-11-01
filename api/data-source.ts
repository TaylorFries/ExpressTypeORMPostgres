import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config()

const AppDataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: ["./typeorm/entity/*.ts"],
    migrations: ["./typeorm/migrations/*.ts"],
    subscribers: []
})

export default AppDataSource;

