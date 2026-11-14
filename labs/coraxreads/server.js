"use strict";

const express = require("express");
const path = require("node:path");

function createApp(pool) {
  const app = express();
  app.use(express.json({ limit: "10kb" }));
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/health", async (_request, response) => {
    try {
      await pool.query("SELECT 1");
      response.json({ status: "ok" });
    } catch (error) {
      console.error("Health check could not reach the database:", error.code || "unknown");
      response.status(503).json({ status: "unavailable" });
    }
  });

  app.get("/api/books", async (_request, response) => {
    try {
      const result = await pool.query(
        "SELECT id, title, author, price_cents FROM books ORDER BY id",
      );
      response.json(result.rows);
    } catch (error) {
      console.error("Book list query failed:", error.code || "unknown");
      response.status(503).json({ error: "Book catalog is temporarily unavailable" });
    }
  });

  return app;
}

if (require.main === module) {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is required. Copy .env.example to .env for local Compose.");
    process.exitCode = 1;
  } else {
    const { Pool } = require("pg");
    const pool = new Pool({ connectionString });
    const server = createApp(pool).listen(process.env.PORT || 3000, "0.0.0.0", () => {
      console.log(`CoraxReads listening on port ${process.env.PORT || 3000}`);
    });

    async function shutdown(signal) {
      console.log(`Received ${signal}; shutting down.`);
      server.close(async (error) => {
        await pool.end();
        if (error) {
          console.error("HTTP server shutdown failed.");
          process.exitCode = 1;
        }
      });
    }

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }
}

module.exports = { createApp };
