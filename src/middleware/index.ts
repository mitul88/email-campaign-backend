import { Express, json, urlencoded } from "express";
import express from "express";
import helmet from "helmet";

export = (app: Express) => {
  app.use(json());
  app.use(helmet());
  app.use(urlencoded());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
