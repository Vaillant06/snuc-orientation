const path = require("path");
const Database = require("better-sqlite3");

const DB_FILE = process.env.DB_FILE || path.join(__dirname, "app.db");
const db = new Database(DB_FILE);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS results (
    email     TEXT    NOT NULL,
    module_id INTEGER NOT NULL,
    retries   INTEGER NOT NULL DEFAULT 0,
    score     INTEGER NOT NULL DEFAULT 100,
    date      TEXT    NOT NULL,
    PRIMARY KEY (email, module_id)
  )
`);

module.exports = db;
