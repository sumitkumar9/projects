import mongoose, { model } from 'mongoose';

interface Icart {
    customerId: string;
    cartItems: [];
  }

const cartSchema = new mongoose.Schema<Icart>({
    customerId: {type: String, required: true},
    cartItems: []
})

const CartModel = model<Icart>('Cart', cartSchema);

export { CartModel };