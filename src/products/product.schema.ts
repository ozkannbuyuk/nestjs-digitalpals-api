import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  isFavorite: { type: Boolean, default: false },
});

export interface Product extends Document {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  isFavorite?: boolean;
}
