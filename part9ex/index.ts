import express from "express";
import calculateBMI from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBMI({ height, weight });
  res.json({ height, weight, bmi });
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});