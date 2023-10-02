import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

const products = [{ title: "tomato" }, { title: "orange" }];
const adresses = [{ value: "Moscow" }, { value: "USA" }];

app.get("/", (req: Request, res: Response) => {
  const text = "Hello 1!";
  res.send(text);
});

app.get("/products", (req: Request, res: Response) => {
  res.send(products);
});

app.get("/adresses", (req: Request, res: Response) => {
  res.send(adresses);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
