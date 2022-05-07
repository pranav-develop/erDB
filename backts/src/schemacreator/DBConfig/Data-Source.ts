import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from "../../config";

// Datasource for mysql database connection
export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    logging: true,
    synchronize: true,
    entities: ["src/schemacreator/DBConfig/entity/*.ts"],
});
