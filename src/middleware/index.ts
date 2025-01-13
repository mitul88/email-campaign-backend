import cookieParser from "cookie-parser";
import { Express, json, urlencoded } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";

export = (app: Express) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(json());
  app.use(helmet());
  app.use(urlencoded());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
};
