//Src/models/consumedProductModel.js
import mongoose from 'mongoose';

const consumedProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    date: {
        type: Date, // Utilizarea tipului Date pentru gestiunea corectă a datelor
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
});

const ConsumedProduct = mongoose.model('ConsumedProduct', consumedProductSchema);

export default ConsumedProduct;
