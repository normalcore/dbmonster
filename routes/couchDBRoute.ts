import { couch } from "../db/couchdb";
import express from "express";
export const couchRouter = express.Router();

couchRouter.get("/", async (req, res) => {
  const people = await couch.get('person', '_all_docs', {
    include_docs: true
  })

  res.status(200).send(people.data.rows.map((elem) => elem.doc.field));
});

couchRouter.post("/", async (req, res) => {
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
  const newPerson = couch.insert("person", {
    field: [name, age, vip],
  });

  res.status(200).send(newPerson);
});
