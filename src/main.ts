import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

app.get("/teste", (req: Request, res: Response) => {
  res.send("DEU BOA!");
});

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
