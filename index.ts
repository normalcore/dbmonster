import express from "express";
import axios from "axios";

import { mongoRouter } from "./routes/mongoRoute";
import { pgRouter } from "./routes/pgRoute";
import { redisRouter } from "./routes/redisRoute";
import { sqliteRouter } from "./routes/sqliteRoute";
import { cassandraRouter } from "./routes/cassandraRoute";
import { mariaDBRouter } from "./routes/mariaDBRoute";
import { cockroachRouter } from "./routes/cockroachDBRoute";
import { couchRouter } from "./routes/couchDBRoute";


const app = express();

app.use(express.json());

app.use("/mongo", mongoRouter);
app.use("/pg", pgRouter);
app.use("/redis", redisRouter);
app.use("/sqlite", sqliteRouter);
app.use("/cassandra", cassandraRouter);
app.use("/mariadb", mariaDBRouter)
app.use("/cockroach", cockroachRouter)
app.use("/couchdb", couchRouter)

app.get('/all', async (req,res) => {
  const result:any = []
  const mongoRes = await axios.get('http://localhost:3000/mongo')
  const pgRes = await axios.get('http://localhost:3000/pg')
  const redisRes = await axios.get('http://localhost:3000/redis')
  const sqliteRes = await axios.get('http://localhost:3000/sqlite')
  const cassandraRes = await axios.get('http://localhost:3000/cassandra')
  const mariadbRes = await axios.get('http://localhost:3000/mariadb')
  const cockroachRes = await axios.get('http://localhost:3000/cockroach')
  const couchRes = await axios.get('http://localhost:3000/couchdb')

  result.push({"mongo": JSON.parse(JSON.stringify(mongoRes.data))})
  result.push({"pg": JSON.parse(JSON.stringify(pgRes.data))})
  result.push({"redis": JSON.parse(JSON.stringify(redisRes.data))})
  result.push({"sqlite": JSON.parse(JSON.stringify(sqliteRes.data))})
  result.push({"cassandra": JSON.parse(JSON.stringify(cassandraRes.data))})
  result.push({"mariadb": JSON.parse(JSON.stringify(mariadbRes.data))})
  result.push({"cockroachdb": JSON.parse(JSON.stringify(cockroachRes.data))})
  result.push({"couchdb": JSON.parse(JSON.stringify(couchRes.data))})

  res.status(200).send(result)
})

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
