const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    completion_date: String,
    current_phase: String,
    images: [String], // Array of image URLs
    video_url: String,
    facilities: [String], // List of facilities
    size: String, // List of size
    area: String, // List of area
    details: String, // List of details
    short_details: String, // List of short_details
    brochure: [String], // List of brochure
    price: String // List of price
});

module.exports = mongoose.model("Property", propertySchema);
