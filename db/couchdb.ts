import NodeCouchDb from "node-couchdb";
import dotenv from "dotenv";
dotenv.config();

export const couch = new NodeCouchDb({
  host: "couchdb",
  port: 5984,
  auth: {
    user: process.env.COUCHDB_USER,
    pass: process.env.COUCHDB_PASSWORD,
  },
});

async function initCouchDB() {
  const dbs = await couch.listDatabases();

  if (!dbs.includes("person")) {
    try {
      await couch.createDatabase("person");
      console.log("Connected to CouchDB!");
    } catch (err) {
      console.log("Cannot connect to CouchDB!: " + err);
    }
  }
  console.log("Connected to CouchDB!");
}

initCouchDB();
