import express from "express";
import { cassandraClient } from "../db/cassandra";
import { v4 as uuidv4 } from "uuid";
export const cassandraRouter = express.Router();

cassandraRouter.get("/", async (req, res) => {
  const query = `SELECT * FROM mykeyspace.person;`;
  const people = await cassandraClient.execute(query);
  res.status(200).send(people.rows);
});

cassandraRouter.post("/", async (req, res) => {
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
  const query = `INSERT INTO mykeyspace.person (name, age, vip, id) VALUES ('${name}', ${age}, ${vip}, ${uuidv4()});`;
  const result = await cassandraClient.execute(query);
  const newPerson = result;

  res.status(200).send(newPerson);
});
