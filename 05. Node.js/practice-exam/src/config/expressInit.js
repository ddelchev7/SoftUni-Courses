import cookieParser from "cookie-parser";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export default function exppressInit(app) {
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static("public"));

  app.use(cookieParser());

  app.use(authMiddleware);
}
