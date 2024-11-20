import { pg } from "../db/pg";
import express from "express";
export const pgRouter = express.Router();

pgRouter.get("/", async (req, res) => {
  const query = `SELECT * FROM person;`;
  const people = await pg.query(query);
  res.status(200).send(people.rows);
});

pgRouter.post("/", async (req, res) => {
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
  const query = `INSERT INTO person (name, age, vip) VALUES ('${name}', ${age}, ${vip}) RETURNING *;`;
  const result = await pg.query(query);
  const newPerson = result.rows[0];

  res.status(200).send(newPerson);
});
