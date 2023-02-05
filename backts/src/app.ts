import cors from "cors";
import express, { Application, Request, Response } from "express";
import "reflect-metadata";
import { NODE_ENV, PORT } from "./config";
import { MysqlDataSource } from "./schemacreator/DBConfig/Data-Source";
import schemaGenerator from "./schemacreator/SchemaGenerator";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (_req: Request, res: Response) => {
    res.send("Welcome to erDB.");
});

app.post("/generate-schema", async (req: Request, res: Response) => {
    console.log(req.body);
    await schemaGenerator(req.body.nodes);
    return res.status(200).json({ status: 200, msg: "Schema Generated Successfully" });
});

app.get("/generate-database-old", (_req: Request, res: Response) => {
    MysqlDataSource.initialize()
        .then(() => {
            console.log("MysqlDataSource initalized successfully.");
            MysqlDataSource.destroy();
            return res.status(200).json({ status: 200, msg: "Databases Generated Successfully" });
        })
        .catch((error: any) => {
            console.log(error);
        });
});

app.listen(PORT, () => console.log(`${NODE_ENV} server is running on port ${PORT}`));
