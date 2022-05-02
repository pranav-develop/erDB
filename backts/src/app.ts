import express, { Application, Request, Response, NextFunction } from "express";
import { NODE_ENV, PORT } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import "reflect-metadata";
import schemaGenerator from "./schemacreator/SchemaGenerator";
import nodes from "./schemacreator/TempData";
import { MysqlDataSource } from "./schemacreator/DBConfig/Data-Source";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    console.log("Generating schema .");
    await schemaGenerator(nodes);
    MysqlDataSource.initialize()
        .then(() => {
            console.log("MysqlDataSource initalized successfully.");
        })
        .catch((error: any) => {
            console.log(error);
        });
    res.send("hello");
});

app.listen(PORT, () => console.log(`${NODE_ENV} server is running on port ${PORT}`));
