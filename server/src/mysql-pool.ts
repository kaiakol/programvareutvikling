import mysql from 'mysql2';

/**
 * MySQL connection pool with options specified in the following environment variables:
 * - `MYSQL_HOST`
 * - `MYSQL_USER`
 * - `MYSQL_PASSWORD`
 * - `MYSQL_DATABASE`
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST = "mysql.stud.ntnu.no",
  user: process.env.MYSQL_USER = "bknielse_PU",
  password: process.env.MYSQL_PASSWORD = "71",
  database: process.env.MYSQL_DATABASE = "bknielse_PU_dev",
  // Reduce load on NTNU MySQL server
  connectionLimit: 1,
  // Convert MySQL boolean values to JavaScript boolean values
  typeCast: (field, next) =>
    field.type == 'TINY' && field.length == 1 ? field.string() == '1' : next(),
});

export default pool;
