import express from "express";
import { productsRouter } from "./routes/products-route";
import { adressesRouter } from "./routes/adresses-route";
import { inputValidationMiddleware } from './middlewares/input-validation-middleware';

let bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser();
app.use(parserMiddleware);
app.use("/adresses", adressesRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
