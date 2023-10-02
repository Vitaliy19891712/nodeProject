import express, { Request, Response } from "express";
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

let products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
let adresses = [
  { id: 1, value: "Moscow" },
  { id: 2, value: "USA" },
];

const parserMiddleware = bodyParser();
app.use(parserMiddleware);
app.get("/", (req: Request, res: Response) => {
  const text = "Hello 1!";
  res.send(text);
});

app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    const searchString = req.query.title?.toString();
    res.send(products.filter((p) => p.title.indexOf(searchString)));
  } else {
    res.send(products);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  let product = products.find((prod) => prod.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

app.get("/adresses", (req: Request, res: Response) => {
  res.send(adresses);
});

app.get("/adresses/:id", (req: Request, res: Response) => {
  let adress = adresses.find((adr) => adr.id === +req.params.id);
  if (adress) {
    res.send(adress);
  } else {
    res.send(404);
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title: req.body.title };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.put("/products/:id", (req: Request, res: Response) => {
  let product = products.find((prod) => prod.id === +req.params.id);
  if (product) {
    let newProduct = { id: +req.params.id, title: req.body.title };
    products = [...products, newProduct];
    res.send(newProduct);
  } else {
    res.send(404);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
