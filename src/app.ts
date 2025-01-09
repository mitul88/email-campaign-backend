import express from "express";
import routes from "./routes/routes";
import middleware from "./middleware";

export const app = express();

// calling all third party middlewares
middleware(app);

// calling all routes
routes(app);