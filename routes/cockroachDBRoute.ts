import { cockroach } from "../db/cockroachdb";
import express from "express";
export const cockroachRouter = express.Router();

cockroachRouter.get("/", async (req, res) => {
  const query = `SELECT * FROM person2;`;
  const people = await cockroach.query(query);
  res.status(200).send(people.rows);
});

cockroachRouter.post("/", async (req, res) => {
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
  const query = `INSERT INTO person2 (name, age, vip) VALUES ('${name}', ${age}, ${vip}) RETURNING *;`;
  const result = await cockroach.query(query);
  const newPerson = result.rows[0];

  res.status(200).send(newPerson);
});
