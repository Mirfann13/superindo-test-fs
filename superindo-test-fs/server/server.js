const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3
const cors = require("cors");
const next = require("next");
const cookieParser = require("cookie-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

// Middleware
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const productVariantsRouter = require("./routes/productVariants");
const transactionsRouter = require("./routes/transactions");
// Connect to SQLite
const db = new sqlite3.Database("testsuperindo.db"); //sesuaikan dengan nama db yang ingin di gunakan

db.serialize(() => {
  // Membuat tabel jika belum ada
  db.run(
    `CREATE TABLE IF NOT EXISTS product (
      id INTEGER PRIMARY KEY,
      plu TEXT NOT NULL,
      name TEXT NOT NULL,
      product_category_id INTEGER,
      active BOOLEAN NOT NULL DEFAULT 1,
      created_user TEXT,
      created_date TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_user TEXT,
      updated_date TEXT
  ) `
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT 1,
      created_user TEXT,
      created_date TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_user TEXT,
      updated_date TEXT
  )`
  );

  db.run(`
    CREATE TABLE IF NOT EXISTS product_variant (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      image_location TEXT,
      qty INTEGER NOT NULL DEFAULT 0,
      price REAL NOT NULL,
      active BOOLEAN NOT NULL DEFAULT 1,
      created_user TEXT,
      created_date TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_user TEXT,
      updated_date TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY, 
      transaction_no TEXT, 
      total_amount REAL NOT NULL, 
      active  BOOLEAN NOT NULL DEFAULT 1,
      created_user TEXT,
      created_date TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_user TEXT,
      updated_date TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS TransactionDetail  (
      id INTEGER PRIMARY KEY, 
      transaction_id TEXT, 
      products TEXT
      created_user TEXT,
      created_date TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_user TEXT,
      updated_date TEXT
  )
`);

  // Menampilkan pesan setelah koneksi berhasil
  ("Connected to the SQLite database");
});

// Routes
const corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));
server.use("/api/auth", authRouter);
server.use("/api/products", productsRouter); // Mengirimkan objek database SQLite ke rute
server.use("/api/categories", categoriesRouter); // Mengirimkan objek database SQLite ke rute
server.use("/api/productvariants", productVariantsRouter);
server.use("/api/transactions", transactionsRouter);

// Start the server
// const PORT = process.env.PORT || 5000;
server.listen(4000, (err) => {
  if (err) throw err;
  ("> Ready on http://localhost:4000");
});
