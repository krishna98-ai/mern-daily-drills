import mongoose from 'mongoose';
const { Schema } = mongoose;
const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    category: {
      type: String,
      enum: ["Food", "Travel", "Shopping", "Other"],
      required: true
    },
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true  
    }
  },
  {
    timestamps: true
  }
);
const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
