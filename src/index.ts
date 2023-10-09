import express from "express";
import { productsRouter } from "./routes/products-route";
import { adressesRouter } from "./routes/adresses-route";
import { runDb } from './routes/repositories/db';

let bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser();
app.use(parserMiddleware);
app.use("/adresses", adressesRouter);
app.use("/products", productsRouter);

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
