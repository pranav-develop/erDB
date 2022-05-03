import express, { Application, Request, Response, NextFunction } from "express";
import { NODE_ENV, PORT } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import "reflect-metadata";
import schemaGenerator from "./schemacreator/SchemaGenerator";
import nodes from "./schemacreator/TempData";
import { initializeMyDataSource, MysqlDataSource } from "./schemacreator/DBConfig/Data-Source";
import fs from "fs";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to erDB.");
});

app.get("/generate-schema", (req: Request, res: Response) => {
    schemaGenerator(req.body.nodeData);
    return res.status(200).json({ status: 200, msg: "Schema Generated Successfully" });
});

app.get("/generate-database", async (req: Request, res: Response) => {
    fs.readdir(__dirname + "/schemacreator/DBConfig/entity/", function (err: any, files: any[]) {
        //handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        } else {
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(__dirname + "/schemacreator/DBConfig/entity/" + file);
                initializeMyDataSource(
                    fs.readFileSync(__dirname + "/schemacreator/DBConfig/entity/" + file, { encoding: "utf8" })
                );
            });
        }
        return res.status(200).json({ msg: "conplete", status: 200 });
    });

    // await MysqlDataSource.initialize()
    //     .then(() => {
    //         console.log("Mysql Data Source initalized.");
    //         MysqlDataSource.destroy();
    //         return res.status(200).json({ status: 200, msg: "Database generated Successfully." });
    //     })
    //     .catch((error: any) => {
    //         console.error("Unable to initalize mysql datasource.");
    //         return res.status(200).json({ status: 500, msg: "Unable to create database." });
    //     });
});

app.get("/testing", (req: Request, res: Response) => {
    console.log(__dirname);
    fs.readdir(__dirname + "/schemacreator/DBConfig/entity/", function (err: any, files: any[]) {
        //handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        } else {
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(__dirname + "/schemacreator/DBConfig/entity/" + file);
                console.log(fs.readFileSync(__dirname + "/schemacreator/DBConfig/entity/" + file, { encoding: "utf8" }));
            });
        }
        return res.status(200).json({ msg: "conplete", status: 200 });
    });
});

app.listen(PORT, () => console.log(`${NODE_ENV} server is running on port ${PORT}`));
