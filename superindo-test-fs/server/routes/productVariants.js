const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Connect to your SQLite database
const db = new sqlite3.Database("testsuperindo.db");

// Route to get all product variants
router.get("/", (req, res) => {
    const query = "SELECT * FROM product_variant";

    db.all(query, [], (err, variants) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        res.json(variants);
    });
});

// Route to add a new product variant
router.post("/", async (req, res) => {
    try {
        const {
            product_id,
            code,
            name,
            image_location,
            qty,
            price,
            active,
            created_user,
            created_date,
            updated_user,
            updated_date,
        } = req.body;

        const query =
            "INSERT INTO product_variant (product_id, code, name, image_location, qty, price, active, created_user, created_date, updated_user, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(
            query,
            [
                product_id,
                code,
                name,
                image_location,
                qty,
                price,
                active,
                created_user,
                created_date,
                updated_user,
                updated_date,
            ],
            function (err) {
                err;
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                const variantId = this.lastID;
                const code = `PDCT${String(product_id).padStart(4, "0")}${String(
                    variantId
                ).padStart(4, "0")}`;

                db.run(
                    "UPDATE product_variant SET code = ? WHERE id = ?",
                    [code, variantId],
                    function (err) {
                        if (err) {
                            return res.status(500).json({ message: "Server error" });
                        }

                        const newProduct = {
                            id: variantId,
                            product_id,
                            code: code,
                            name,
                            image_location,
                            qty,
                            price,
                            active,
                            created_user,
                            updated_user,
                        };

                        newProduct;
                        res.status(201).json(newProduct);
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {
            product_id,
            code,
            name,
            image_location,
            qty,
            price,
            active,
            created_user,
            updated_user,
        } = req.body;
        const variantId = req.params.id;

        const query =
            "UPDATE product_variant SET product_id = ?, code = ?, name = ?, image_location = ?, qty = ?, price = ?, active = ?, created_user = ?, updated_user = ? WHERE id = ?";
        db.run(
            query,
            [
                product_id,
                code,
                name,
                image_location,
                qty,
                price,
                active,
                created_user,
                updated_user,
                variantId,
            ],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: "Server error" });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ message: "Product variant not found" });
                }

                const updatedVariant = {
                    id: variantId,
                    product_id,
                    code,
                    name,
                    image_location,
                    qty,
                    price,
                    active,
                    created_user,
                    updated_user,
                };

                res.json(updatedVariant);
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route to delete a product variant by ID
router.delete("/:id", async (req, res) => {
    try {
        const variantId = req.params.id;

        const query = "DELETE FROM product_variant WHERE id = ?";
        db.run(query, [variantId], function (err) {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Product variant not found" });
            }

            res.json({ message: "Product variant deleted" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

// Add routes for updating and deleting product variants

module.exports = router;
