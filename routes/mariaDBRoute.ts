
import { mariaDB } from "../db/mariadb";
import express from "express";
export const mariaDBRouter = express.Router();

mariaDBRouter.get("/", async (req, res) => {
  const query = `SELECT * FROM person;`;
  const people = await mariaDB(query);
  res.status(200).send(people);
});

mariaDBRouter.post("/", async (req, res) => {
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
  const newPerson = await mariaDB(query);


  res.status(200).send(newPerson);
});
