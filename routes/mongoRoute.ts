import { Person } from "../db/mongo";
import express from "express";
export const mongoRouter = express.Router();

mongoRouter.get("/", async (req, res) => {
  const people = await Person.find();
  res.status(200).send(people);
});

mongoRouter.post("/", async (req, res) => {
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
  const newPerson = new Person({ name, age, vip });
  newPerson.save();
  res.status(200).send(newPerson);
});
