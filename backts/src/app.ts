import express, { Application, Request, Response, NextFunction } from "express";
import { NODE_ENV, PORT } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import schemaGenerator from "./schemacreator/SchemaGenerator";
import nodes from "./schemacreator/TempData";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    console.log("Generating schema .");
    schemaGenerator(nodes);
    res.send("hello");
});

app.listen(PORT, () => console.log(`${NODE_ENV} server is running on port ${PORT}`));
