import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    // url: "host=localhost port=5432 dbname=streaming_database user=postgres password=xxxxxxx connect_timeout=10 sslmode=prefer",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "A37hu3AM",
    database: "streaming_database",
    entities: ["src/**/**Entity.ts"]
});
