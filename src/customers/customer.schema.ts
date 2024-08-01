import { Schema, Document } from 'mongoose';

export interface Customer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});
