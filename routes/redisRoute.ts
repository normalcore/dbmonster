import { redisClient } from "../db/redis";
import express from "express";
import { v4 as uuidv4 } from "uuid";

export const redisRouter = express.Router();

redisRouter.get("/", async (req, res) => {
  const people = await redisClient.hVals("person");
  const parsed: any = [];
  for (let i = 0; i < people.length; i++) {
    parsed.push(JSON.parse(people[i]));
  }
  res.status(200).json(parsed);
});

redisRouter.post("/", async (req, res) => {
  const { name, age, vip } = req.body;
  if (
    !name ||
    !age ||
    !vip ||
    typeof name !== "string" ||
    typeof age !== "number" ||
    typeof vip !== "boolean"
  ) {
    res.status(400).send("Bad request 400");
    return;
  }
  let id = uuidv4();
  const payload = [name, age, vip];

  redisClient.hSet("person", id, JSON.stringify(payload));
  res.status(200).send("Ok!");
});

redisRouter.delete("/", async (req, res) => {
  try {
    await redisClient.flushAll();
    res.status(200).send("Ok!");
  } catch (err) {
    res.status(500).send("Something went wrong :-(" + err);
  }
});
