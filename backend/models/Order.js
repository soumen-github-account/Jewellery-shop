import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    order_id: {type: Number, unique: true},
    name: {type: String, required: true},
    product: {type: String},
    quantity: {type: Number}
}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema)