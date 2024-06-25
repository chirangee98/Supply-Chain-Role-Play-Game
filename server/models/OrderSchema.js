import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    providerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    providerName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', OrderSchema);
