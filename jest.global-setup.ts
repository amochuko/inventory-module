import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { sql } from "./src/common/database/sqlConnection";

export default async () => {
  await sql({
    text: `
    DROP TABLE IF EXISTS inventory.suppliers CASCADE;
      CREATE TABLE inventory.suppliers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      address VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(25) NOT NULL,
      description character varying(255) NOT NULL,
      created_at timestamp with time zone NOT NULL DEFAULT now(),
      updated_at timestamp with time zone NOT NULL DEFAULT now()
    )`,
  });
};
