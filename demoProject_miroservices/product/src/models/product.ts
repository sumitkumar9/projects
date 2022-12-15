import mongoose, { model } from 'mongoose';


interface IProduct {
    productName: string;
    isActive: boolean;
    description?: string;
    category: string
  }

const ProductSchema = new mongoose.Schema<IProduct>({

    productName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    description: { type: String },
    category: { type: String, required: true },
});

const Product = model<IProduct>('Product', ProductSchema);
export { Product } 