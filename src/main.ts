import "reflect-metadata";

import express, { type Request, type Response } from "express";
import { AppDataSource } from "./shared/infra/database/AppSource";

const app = express();
const PORT = 3000;

app.get("/teste", (req: Request, res: Response) => {
  res.send("DEU BOA!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");

    app.listen(3000, () => {
      console.log("Servidor rodando");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar:", error);
  });

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
