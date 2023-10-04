import { Router } from "express";
import { Request, Response } from "express";
import { productsRepository } from "./repositories/products-repositories";

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(req.query.title?.toString());
  res.send(foundProducts);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  let product = productsRepository.getProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

productsRouter.post("", (req: Request, res: Response) => {
  const newProduct = productsRepository.createProducts(req.body.title);
  res.status(201).send(newProduct);
});

productsRouter.put("/:id", (req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);
  if (isUpdated) {
    let product = productsRepository.getProductById(+req.params.id);
    res.send(product);
  } else {
    res.send(404);
  }
});
 