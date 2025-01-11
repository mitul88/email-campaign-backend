import { Application } from "express";
import express from "express";

export = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
