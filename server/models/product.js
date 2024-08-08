const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    category: { type: String, required: true, enum : ["Headphones","Ear Buds", "Ear Plugs"] },
    brand: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    ratings: { type: Number, default: 0 },
    //reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    weight: { type: Number },
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
    },
    color: { type: String },
    size: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);