// const express = require('express')
import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.secret = "kapil sarma";
  next();
});

app.get("/", (req, res) => {
  res.json({message: 'hello'})
});

app.use("/api", protect, router);
app.post("/signup", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if(err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: 'oops thats on us'})
  }
})

module.exports = app;
export default app
