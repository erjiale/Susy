const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  // user: "vmlqpkbehnsvll",
  // password: "4f48b6820f51701352c3d1ee963f3b91266caa35bb87e1df3f1be4bfde0c1644",
  // host: "ec2-34-232-212-164.compute-1.amazonaws.com",
  // database: "d2es97cmsqofg2",
  user: "postgres",
  password: process.env.DB_USER_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
});

module.exports = pool;
