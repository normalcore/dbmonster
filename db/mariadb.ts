
import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

const mariaPool = mariadb.createPool({
  host: "mariadb",
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 20,
  connectTimeout: 10000,
});

export const mariaDB = async (query) => {
  const mariaDB = await mariaPool.getConnection();

  const answer = mariaDB.query(query);

  mariaDB.release();
  return answer
};

const query = `CREATE TABLE IF NOT EXISTS person
(
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25),
  age INTEGER,
  vip BOOLEAN
);`;

mariaDB(query);
console.log('Connected to MariaDB!')
