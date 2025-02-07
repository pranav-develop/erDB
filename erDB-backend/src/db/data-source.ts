import { DB_CONFIGS } from "env";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: DB_CONFIGS.DB_TYPE as any,
  host: DB_CONFIGS.DB_HOST,
  port: parseInt(DB_CONFIGS.DB_PORT),
  username: DB_CONFIGS.DB_USER,
  password: DB_CONFIGS.DB_PASSWORD,
  database: "erdb",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
