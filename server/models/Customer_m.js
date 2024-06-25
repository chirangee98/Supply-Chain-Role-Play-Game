import mongoose from 'mongoose';

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    enum: ['user', 'retailer', 'wholesaler', 'distributor', 'manufacturer', 'admin'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Define enum values for status
    default: 'inactive' // Set default value to 'inactive'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Customer', CustomerSchema);
