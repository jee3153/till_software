import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
});

const transactionSchema = new Schema(
  {
    price: { type: Number },
    method: { type: String, default: 'VISA' },
    cardNumber: { type: String },
    paidTime: { type: Date, default: new Date() },
    // items: [itemSchema],
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  }
  //   { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
// export const Item = mongoose.model('Item', itemSchema);
