const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// Fetch all properties
router.get("/properties", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a specific property by ID
router.get("/properties/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.json(property);
    } catch (err) {
        res.status(404).json({ message: "Property not found" });
    }
});

module.exports = router;
