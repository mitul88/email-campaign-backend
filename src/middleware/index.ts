import { Application, json, urlencoded } from "express";
import express from "express";

export = (app: Application) => {
  app.use(json());
  app.use(urlencoded());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
