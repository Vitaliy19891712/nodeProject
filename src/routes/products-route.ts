import { Router } from "express";
import { Request, Response } from "express";
import { productsRepository } from "./repositories/products-db-repositories";
import { body, param } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
export const productsRouter = Router({});

productsRouter.get("/", async (req: Request, res: Response) => {
  const foundProducts = await productsRepository.findProducts(req.query.title?.toString());
  res.send(foundProducts);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  let product = await productsRepository.getProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDeleted = await productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

const titleValidation = body("title")
  .trim()
  .notEmpty({ ignore_whitespace: true })
  .withMessage("Field is empty")
  .isLength({ max: 20, min: 2 })
  .withMessage("Title length should be from 2 to 20 characters");

const idValidation = param("id", "Field is empty")
  .notEmpty({ ignore_whitespace: true })
  .isNumeric()
  .withMessage("Should be numeric")
  .isLength({ max: 13, min: 1 })
  .withMessage("Id length should be from 1 to 13 characters");

productsRouter.post("/", titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
  const newProduct = await productsRepository.createProducts(req.body.title);
  res.status(201).send(newProduct);
});

productsRouter.put("/:id", titleValidation, idValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
  const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title);
  if (isUpdated) {
    const product = await productsRepository.getProductById(+req.params.id);
    res.send(product);
  }
});
