import { DataSource } from "typeorm";

export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    name: "root",
    password: "FUNbox@123",
    database: "erdb",
    entities: ["./entity/*{.js,.ts}"],
});

MysqlDataSource.initialize()
    .then(() => {
        console.log("MysqlDataSource initalized successfully.");
    })
    .catch((error: any) => {
        console.log(error);
    });
