import { Router } from "express";
import { Request, Response } from "express";

let products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  if (req.query.title) {
    const searchString = req.query.title?.toString();
    res.send(products.filter((p) => p.title.indexOf(searchString)));
  } else {
    res.send(products);
  }
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  let product = products.find((prod) => prod.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});

productsRouter.post("", (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title: req.body.title };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

productsRouter.put("/:id", (req: Request, res: Response) => {
  let product = products.find((prod) => prod.id === +req.params.id);
  if (product) {
    let newProduct = { id: +req.params.id, title: req.body.title };
    products = [...products, newProduct];
    res.send(newProduct);
  } else {
    res.send(404);
  }
});
