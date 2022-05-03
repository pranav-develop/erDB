import { DataSource } from "typeorm";
// import { Photo } from "./entity/SampleEntity";
import { test } from "./entity/test";

// export const MysqlDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "FUNbox@123",
//     database: "erdb",
//     logging: true,
//     synchronize: true,
//     entities: [test],
// });

export const initializeMyDataSource = (files: any): void => {
    const MysqlDataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "FUNbox@123",
        database: "erdb",
        logging: true,
        synchronize: true,
        entities: [...files],
    });
    MysqlDataSource.initialize()
        .then(() => {
            console.log("MysqlDataSource initalized successfully.");
        })
        .catch((error: any) => {
            console.log(error);
        });
};

// MysqlDataSource.initialize()
//     .then(() => {
//         console.log("MysqlDataSource initalized successfully.");
//     })
//     .catch((error: any) => {
//         console.log(error);
//     });
