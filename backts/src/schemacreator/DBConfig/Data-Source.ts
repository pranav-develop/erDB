import { DataSource } from "typeorm";
// import { Photo } from "./entity/SampleEntity";
// import { TEST } from "./entity/test";

export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "FUNbox@123",
    database: "erdb",
    logging: true,
    synchronize: true,
    entities: ["src/schemacreator/DBConfig/entity/*.ts"],
});

// MysqlDataSource.initialize()
//     .then(() => {
//         console.log("MysqlDataSource initalized successfully.");
//     })
//     .catch((error: any) => {
//         console.log(error);
//     });
