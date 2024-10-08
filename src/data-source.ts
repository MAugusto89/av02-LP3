/* eslint-disable import/prefer-default-export */
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Autor } from "./entity/Autor";
import { Trabalho } from "./entity/Trabalho";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "feciaqteste.db",
  synchronize: true,
  logging: true,
  entities: [Autor, Trabalho],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log("DataSource connection successful!"))
  .catch((erro) => console.error("DataSource connection failed", erro));
