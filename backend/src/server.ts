import { resolve } from "path";
import "reflect-metadata";
import express, { Response } from "express";
// setup env
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const env = dotenv.config({ path: resolve(__dirname, "..", ".env") });
dotenvExpand(env);

import { NODE_ENV, PORT } from "./config";
import "./utils/db";
import { ValidationError } from "express-validation";
import createHttpError, { HttpError } from "http-errors";
import compression from "compression";
import cors from "cors";
import routes from "./routes";

const dev = NODE_ENV === "development";

const app = express();

(async () => {
  app.use([
    compression(),
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
  ]);

  app.get("/", (_req, res) => res.json({ message: "Thullo api" }));
  app.use("/api", routes);
  app.use((_req, _res, next) => next(createHttpError(404, "Not Found")));
  app.use((err: HttpError, _req: any, res: Response, _next: any) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    const errResponse = {
      message: err.message,
      status: err.statusCode,
    } as HttpError;

    if (dev) errResponse.stack = err.stack;
    return res.status(err.statusCode).json(errResponse);
  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
