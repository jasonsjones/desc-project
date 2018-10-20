import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
    discriminatorKey: 'itemCategory',
    timestamps: true
};

const itemSchema = new Schema(
    {
        clientId: { type: String, required: true },
        submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        numberOfItems: { type: Number },
        urgency: { type: String },
        status: { type: String },
        notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
    },
    options
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
