import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const clientRequestSchema = new Schema(
    {
        clientId: { type: String, required: true },
        requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
    },
    { timestamps: true }
);

const ClientRequest = mongoose.model('ClientRequest', clientRequestSchema);

export default ClientRequest;
