const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3

// Koneksi ke database SQLite
const db = new sqlite3.Database("testsuperindo.db"); // Ganti nama file sesuai database Anda
const createUserTable = () => {
    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `;

    db.run(createUserTableQuery, (err) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        } else {
            ("'users' table created successfully.");
        }
    });
};

createUserTable();

db;
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        username, email, password, role;
        // Cek apakah email sudah digunakan
        db.get("SELECT * FROM user WHERE email = ?", [email], async (err, row) => {
            if (err) {
                err, "error";
                return res.status(500).json({ message: "Server error" });
            }
            if (row) {
                row;
                return res.status(400).json({ message: "Email is already in use" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Buat user baru
            db.run(
                "INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)",
                [username, email, hashedPassword, role],
                function (err) {
                    if (err) {
                        return res.status(500).json({ message: "Server error" });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { userId: this.lastID, email: email, role: role },
                        "your-secret-key", // Ganti dengan kunci rahasia Anda yang lebih aman
                        { expiresIn: "1h" } // Sesuaikan dengan waktu berlaku token Anda
                    );

                    res.status(201).json({
                        token,
                        userId: this.lastID,
                        email: email,
                        role: role,
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        email, password;
        // Cari pengguna berdasarkan alamat email
        db, "db";
        db.get("SELECT * FROM user WHERE email = ?", [email], async (err, row) => {
            err, "error";
            row, "row";
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }

            // Jika pengguna tidak ditemukan atau kata sandi tidak cocok
            if (!row || !(await bcrypt.compare(password, row.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Generate JWT token
            const token = jwt.sign(
                { userId: row.id, email: email, role: row.role },
                "your-secret-key", // Ganti dengan kunci rahasia Anda yang lebih aman
                { expiresIn: "1h" } // Sesuaikan dengan waktu berlaku token Anda
            );
            res.status(200).json({
                token,
                userId: row.id,
                email: email,
                role: row.role,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
