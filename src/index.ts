import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products-route";
import { adressesRouter } from './routes/adresses-route';
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser();
app.use(parserMiddleware);

app.use("/adresses", adressesRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
