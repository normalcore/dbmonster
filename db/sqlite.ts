import sqlite3 from "sqlite3";
export const sqlite = new sqlite3.Database("./sqlitedatabase.db", (error) => {
  if (error) {
    return console.log("Cannot connect to SQLite!: " + error.message);
  }
});

console.log("Connected to SQLite!");

sqlite.run(`
    CREATE TABLE IF NOT EXISTS person
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(25),
      age INTEGER,
      vip BOOLEAN
    );
  `);
