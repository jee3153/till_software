import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
});

export const Product = mongoose.model('Product', productSchema);
