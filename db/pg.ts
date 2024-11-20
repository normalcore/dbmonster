import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pg = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
});

pg.connect()
  .then(() => {
    console.log("Connected to Postgres!");
  })
  .catch((err) => {
    console.log("Cannot connect to postgres: " + err);
  });

const query = `CREATE TABLE IF NOT EXISTS person (
    name VARCHAR(45),
    age INTEGER,
    vip BOOLEAN
)`;

pg.query(query)
  .then(() => {
    console.log("PG: Table created successfuly!");
  })
  .catch((err) => {
    console.log("PG: Cannot create table: " + err);
  });
