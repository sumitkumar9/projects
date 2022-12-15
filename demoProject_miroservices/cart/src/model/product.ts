import mongoose, { model } from 'mongoose';

interface Iproduct{
    productId: string,
    productName: string
}

const productSchema = new mongoose.Schema<Iproduct>({
    productId: {type: String, required: true},
    productName: {type: String, required: true}
});

const ProductModel = model<Iproduct>('Product', productSchema);

export {ProductModel};