import { Router } from "express";
import { Request, Response } from "express";

let adresses = [
  { id: 1, value: "Moscow" },
  { id: 2, value: "USA" },
];

export const adressesRouter = Router({});

adressesRouter.get("/", (req: Request, res: Response) => {
  res.send(adresses);
});

adressesRouter.get("/:id", (req: Request, res: Response) => {
  let adress = adresses.find((adr) => adr.id === +req.params.id);
  if (adress) {
    res.send(adress);
  } else {
    res.send(404);
  }
});
