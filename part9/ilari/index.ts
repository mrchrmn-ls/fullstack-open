import express from "express";
import diaryRouter from "./src/routes/diary";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("pinging...");
  res.send("pong!");
});

app.use("/api/diaryentries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});