import { FastifyInstance } from "fastify";
import { pool } from "./db";

interface TQuerystring {
  int1: number;
  int2: number;
  limit: number;
  str1: string;
  str2: string;
}

const queryStringSchema = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        int1: { type: "number" },
        int2: { type: "number" },
        limit: { type: "number" },
        str1: { type: "string" },
        str2: { type: "string" },
      },
    },
  },
};

// Example: curl http://127.0.0.1:3000/fizzbuzz\?int1\=13\&int2\=4\&limit\=100\&str1\=fizz\&str2\=buzz

async function routes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: TQuerystring }>(
    "/fizzbuzz",
    queryStringSchema,
    async (request, reply) => {
      const { int1, int2, limit, str1, str2 } = request.query;

      switch (true) {
        case int1 == null:
        case int2 == null:
        case limit == null:
        case str1 == null || str1 == "":
        case str2 == null || str2 == "":
          reply.status(404).send("Wrong parameter");
          return;
        default:
          break;
      }

      const output: (number | string)[] = [];

      for (let i = 1; i <= limit; i++) {
        if (i % int1 === 0 && i % int2 === 0) {
          output.push(str1 + str2);
        } else if (i % int2 === 0) {
          output.push(str2);
        } else if (i % int1 === 0) {
          output.push(str1);
        } else output.push(i);
      }

      // 🆕 Enregistrer la requête en BDD
      try {
        await pool.query(
          "INSERT INTO requests (int1, int2, limit_value, str1, str2) VALUES ($1, $2, $3, $4, $5)",
          [int1, int2, limit, str1, str2],
        );
      } catch (error) {
        fastify.log.error("Erreur insertion BDD:", error);
        // On continue quand même pour renvoyer le résultat
      }

      reply.send({ output });
    },
  );

  fastify.get("/stats/top", async (_, reply) => {
    const result = await pool.query(`
    SELECT 
      int1, 
      int2, 
      str1, 
      str2, 
      COUNT(*) as usage_count
    FROM requests
    GROUP BY int1, int2, str1, str2
    ORDER BY usage_count DESC
    LIMIT 5
  `);

    reply.send({ top_combinations: result.rows });
  });

  fastify.get("/stats/recent", async (_, reply) => {
    const result = await pool.query(`
    SELECT *
    FROM requests
    ORDER BY created_at DESC
    LIMIT 10
  `);

    reply.send({ recent_requests: result.rows });
  });

  fastify.get("/stats", async (_, reply) => {
    const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
    const avgLimit = await pool.query("SELECT AVG(limit_value) FROM requests");
    const mostUsedStr1 = await pool.query(`
    SELECT str1, COUNT(*) as count 
    FROM requests 
    GROUP BY str1 
    ORDER BY count DESC 
    LIMIT 1
  `);

    reply.send({
      total_requests: totalRequests.rows[0].count,
      average_limit: Math.round(avgLimit.rows[0].avg),
      most_used_str1: mostUsedStr1.rows[0]?.str1 || "N/A",
    });
  });
}

export { routes };
