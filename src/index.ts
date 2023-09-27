import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  const text = "Hello 1!";
  res.send(text);
});
app.post("/QWEQWE", async (req, res) => {
  res.sendStatus(200);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
