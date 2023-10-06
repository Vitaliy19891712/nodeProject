import { Router } from "express";
import { Request, Response } from "express";
import { productsRepository } from "./repositories/products-repositories";
import { body, param, validationResult } from "express-validator";
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
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

const titleValidation = body("title")
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

productsRouter.post("/", titleValidation,inputValidationMiddleware, (req: Request, res: Response) => {
  const newProduct = productsRepository.createProducts(req.body.title);
  res.status(201).send(newProduct);
});

productsRouter.put("/:id", titleValidation, idValidation, inputValidationMiddleware,(req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);
  if (isUpdated) {
    let product = productsRepository.getProductById(+req.params.id);
    res.send(product);
  }
});
