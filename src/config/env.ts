import dotenv from "dotenv";
dotenv.config();

const envs = {
  JWT_SECRET: String(process.env.JWT_SECRET),
  MONGODB_URI: process.env.MONGODB_URI,
  // POSTGRESS
  PGHOST_LOCAL: process.env.PGHOST_LOCAL,
  PGUSER_LOCAL: process.env.PGUSER_LOCAL,
  PGDATABASE_LOCAL: process.env.PGDATABASE_LOCAL,
  PGPASSWORD_LOCAL: process.env.PGPASSWORD_LOCAL,
  PGPORT_LOCAL: Number(process.env.PGPORT_LOCAL),
  PGDB_CONNECTION_STRING: process.env.POSTGRES_DATABASE_URL,
};

export default envs;
