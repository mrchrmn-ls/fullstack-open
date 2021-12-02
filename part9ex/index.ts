import express from "express";
import calculateBMI from "./bmiCalculator";
import { calculateExercises, ExerciseValues } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBMI({ height, weight });
    res.json({ height, weight, bmi });
  } else {
    res.status(400).json({ error: "parameters must be numbers" });
  }
});

app.post("/exercises", (req, res) => {
  if (!req.body.dailyHours || !req.body.target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (typeof(req.body.target) === "number" &&
      Array.isArray(req.body.dailyHours) &&
      req.body.dailyHours.every((item: any) => typeof(item) === "number")) {

    const input = req.body as ExerciseValues;
    res.status(200).json(calculateExercises(input));
  }

  res.status(400).json({ error: "parameters have wrong format" });
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});