import express from "express";
import connectionPool from "./utils/db.mjs";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/get-all", async (req, res) => {
  const totalModels = await connectionPool.query(
    `
        select count(*) from pump_data
    `
  );
  return res.json(totalModels.rows[0]);
});

app.post("/check-range", async (req, res) => {
  const input = req.body;
  if (input.flow_m3hr) {
    const response = await connectionPool.query(
      `
        select * from pump_data
        where max_flow_m3hr >= $1 and max_head >= $2 and min_head <= $2
        `,
      [input.flow_m3hr, input.head]
    );
    return res.status(200).json(response.rows);
  } else if (input.flow_ls) {
    const response = await connectionPool.query(
      `
        select * from pump_data
        where max_flow_ls >= $1 and max_head >= $2 and min_head <= $2
        `,
      [input.flow_ls, input.head]
    );
    return res.status(200).json(response.rows);
  }
});

app.post("/curve_data", async (req, res) => {
  const input = req.body;
  if (input.flow_m3hr) {
    const response = await connectionPool.query(
      `
        select *
        from curve_graph_data
        where model_id = $1
        order by abs(c_head - $2) asc
        LIMIT 20
        `,
      [input.model_id, input.head]
    );
    return res.status(200).json(response.rows);
  } else if (input.flow_ls) {
    const response = await connectionPool.query(
      `
        select *
        from curve_graph_data
        where model_id = $1
        order by abs(c_head - $2) asc
        LIMIT 20
        `,
      [input.model_id, input.head]
    );
    return res.status(200).json(response.rows);
  }
});

app.post("/efficiency_data", async (req, res) => {
  const input = req.body;
  if (input.flow_m3hr) {
    const lower = await connectionPool.query(
      `
        select *
        from efficiency_graph_data
        where model_id = $1
        order by abs(CAST(e_flow_m3hr AS DECIMAL)-$2) + abs( CAST(e_head AS DECIMAL) - $3) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1, input.head1]
    );

    const upper = await connectionPool.query(
      `
        select *
        from efficiency_graph_data
        where model_id = $1
        order by abs(CAST(e_flow_m3hr AS DECIMAL)-$2) + abs( CAST(e_head AS DECIMAL) - $3) asc
        LIMIT 20
        `,
      [input.model_id, input.flow2, input.head2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  } else if (input.flow_ls) {
    const lower = await connectionPool.query(
      `
        select *
        from efficiency_graph_data
        where model_id = $1
        order by abs(CAST(e_flow_ls AS DECIMAL)-$2) + abs( CAST(e_head AS DECIMAL) - $3) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1, input.head1]
    );

    const upper = await connectionPool.query(
      `
        select *
        from efficiency_graph_data
        where model_id = $1
        order by abs(CAST(e_flow_ls AS DECIMAL)-$2) + abs( CAST(e_head AS DECIMAL) - $3) asc
        LIMIT 20
        `,
      [input.model_id, input.flow2, input.head2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  }
});

app.post("/power_data", async (req, res) => {
  const input = req.body;
  if (input.flow_m3hr) {
    const lower = await connectionPool.query(
      `
        select *
        from power_graph_data
        where model_id = $1
        order by abs(CAST(p_flow_m3hr AS DECIMAL)-$2) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1]
    );

    const upper = await connectionPool.query(
      ` 
        select *
        from power_graph_data
        where model_id = $1
        order by abs(CAST(p_flow_m3hr AS DECIMAL)-$2) asc
        LIMIT 20
        `,
      [input.model_id, input.flow2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  } else if (input.flow_ls) {
    const lower = await connectionPool.query(
      `
        select *
        from power_graph_data
        where model_id = $1
        order by abs(CAST(p_flow_ls AS DECIMAL)-$2) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1]
    );

    const upper = await connectionPool.query(
      `
        select *
        from power_graph_data
        where model_id = $1
        order by abs(CAST(p_flow_ls AS DECIMAL)-$2) asc
        LIMIT 20
        `,
      [input.model_id, input.flow2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  }
});

app.post("/npshr_data", async (req, res) => {
  const input = req.body;
  if (input.flow_m3hr) {
    const lower = await connectionPool.query(
      `
        select *
        from npshr_graph_data
        where model_id = $1
        order by abs(CAST(np_flow_m3hr AS DECIMAL)-$2) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1]
    );

    const upper = await connectionPool.query(
      ` 
        select *
        from npshr_graph_data
        where model_id = $1
        order by abs(CAST(np_flow_m3hr AS DECIMAL)-$2) asc
        LIMIT 20
        `,
      [input.model_id, input.flow2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  } else if (input.flow_ls) {
    const lower = await connectionPool.query(
      `
        select *
        from npshr_graph_data
        where model_id = $1
        order by abs(CAST(np_flow_ls AS DECIMAL)-$2) asc
        LIMIT 1
        `,
      [input.model_id, input.flow1]
    );

    const upper = await connectionPool.query(
      `
        select *
        from npshr_graph_data
        where model_id = $1
        order by abs(CAST(np_flow_ls AS DECIMAL)-$2) asc
        LIMIT 1
        `,
      [input.model_id, input.flow2]
    );
    return res.status(200).json([...lower.rows, ...upper.rows]);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
