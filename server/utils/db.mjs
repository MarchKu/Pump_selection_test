import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString: "postgresql://postgres:123456789@localhost:5432/pump",
});

export default connectionPool;
