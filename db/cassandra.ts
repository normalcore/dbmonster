import cassandra from "cassandra-driver";
import dotenv from "dotenv";
dotenv.config();

const auth_provider = new cassandra.auth.PlainTextAuthProvider(
  process.env.CASSANDRA_USER!,
  process.env.CASSANDRA_PASSWORD!
);

let contactPoints = ["cassandra"];
export let cassandraClient = new cassandra.Client({
  authProvider: auth_provider,
  contactPoints: contactPoints,
  localDataCenter: "datacenter1",
});

let query = `CREATE KEYSPACE IF NOT EXISTS mykeyspace
  WITH REPLICATION = { 
   'class' : 'NetworkTopologyStrategy', 
   'datacenter1' : 1 
  } ;`;

let query2 = `CREATE TABLE IF NOT EXISTS mykeyspace.person ( 
   id UUID PRIMARY KEY, 
   name text, 
   age int,
   vip boolean );`;

async function initCassandra() {
  try {
    await cassandraClient.execute(query);
    await cassandraClient.execute(query2);
    console.log("Connected to Cassandra!")
  } catch (err) {
    console.log("Cannot init Cassandra!: " + err);
  } 
}
initCassandra()