import { sqlite } from "../db/sqlite";
import express from "express";
export const sqliteRouter = express.Router();

sqliteRouter.get("/", async (req, res) => {
  const query = `SELECT * FROM person;`;
  sqlite.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: "Error fetching people data" });
    }
    res.status(200).send(rows);
  });
});

sqliteRouter.post("/", async (req, res) => {
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
  const query = `INSERT INTO person (name, age, vip) VALUES (?, ?, ?);`;
  sqlite.run(query, [name, age, vip], function (err) {
    if (err) {
      return res.status(500).send({ error: "Error inserting person data" });
    }

    res.status(200).send({
      name,
      age,
      vip,
    });
  });
});
