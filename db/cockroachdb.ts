import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const cockroach = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
});

cockroach
  .connect()
  .then(() => console.log("Connected to CockroachDB!"))
  .catch((err) => console.error("Cannot connect to CockroachDB!: " + err));

const query = `CREATE TABLE IF NOT EXISTS person2 (
    name VARCHAR(45),
    age INTEGER,
    vip BOOLEAN
)`;

cockroach
  .query(query)
  .then(() => {
    console.log("Cockroach: Table created successfuly!");
  })
  .catch((err) => {
    console.log("Cockroach: Cannot create table: " + err);
  });
