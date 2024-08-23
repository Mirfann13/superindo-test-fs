const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3

// Koneksi ke database SQLite
const db = new sqlite3.Database("testsuperindo.db"); // Ganti nama file sesuai database Anda

// Route untuk mendapatkan semua kategori
router.get("/", (req, res) => {
    const query = "SELECT * FROM category";

    db.all(query, [], (err, categories) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.json(categories);
    });
});

// Route untuk menambahkan kategori baru
router.post("/", async (req, res) => {
    try {
        const { name, active, created_user, created_date, updated_user, updated_date } = req.body;

        const query =
            "INSERT INTO category (name , active, created_user, created_date , updated_user , updated_date) VALUES (?, ?, ?, ?, ?,?)";
        db.run(
            query,
            [name, active, created_user, created_date, updated_user, updated_date],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                const categoryId = this.lastID;

                const newCategory = {
                    id: categoryId,
                    name,
                    active,
                    created_user,
                    created_date,
                    updated_user,
                    updated_date,
                };
                newCategory;
                res.status(201).json(newCategory);
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route untuk memperbarui kategori berdasarkan ID
router.put("/:id", async (req, res) => {
    try {
        const { name, description, active, created_user, updated_user, updated_date } = req.body;
        const categoryId = req.params.id;

        const query =
            "UPDATE category SET name = ?, code = ?, active = ?, created_user = ?, created_date = ?, updated_user = ?, updated_date = ?";
        db.run(
            query,
            [name, description, active, created_user, updated_user, updated_date, categoryId],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ message: "Category not found" });
                }

                const updatedCategory = { id: categoryId, name, description };

                res.json(updatedCategory);
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route untuk menghapus kategori berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        const query = "DELETE FROM category WHERE id = ?";
        db.run(query, [categoryId], function (err) {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.json({ message: "Category deleted" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
