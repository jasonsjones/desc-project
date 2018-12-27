import mongoose from 'mongoose';

import { Note, ClientRequest } from '../models';

const Schema = mongoose.Schema;

const LOCATIONS = [
    'Aurora House',
    'N 96th Street',
    'Interbay Place',
    'Kerner-Scott House',
    'Canaday House',
    'Eastlake Building',
    'Lyon Building',
    'Morrison Building',
    'Evans House',
    'Union Hotel',
    'Estelle',
    'Rainier House',
    'Cottage Grove Commons'
];

const options = {
    discriminatorKey: 'itemCategory',
    timestamps: true
};

const itemSchema = new Schema(
    {
        clientId: { type: String, required: true },
        clientRequest: { type: Schema.Types.ObjectId, ref: 'ClientRequest', required: true },
        submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        location: { type: String, enum: LOCATIONS, required: true },
        numberOfItems: { type: Number, default: 1 },
        urgency: {
            type: String,
            enum: ['survival', 'life-changing', 'important'],
            default: 'important'
        },
        status: {
            type: String,
            enum: ['active', 'approved', 'wishlist', 'archive', 'denied'],
            default: 'active'
        },
        notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
    },
    options
);

itemSchema.post('remove', (deletedItem, next) => {
    Promise.all([
        cascadeDeleteNotes(deletedItem),
        removeDeletedItemFromClientRequest(deletedItem)
    ]).then(() => next());
});

const cascadeDeleteNotes = deletedItem => Note.deleteMany({ itemId: deletedItem._id }).exec();

const removeDeletedItemFromClientRequest = deletedItem =>
    ClientRequest.findById(deletedItem.clientRequest)
        .exec()
        .then(request => {
            if (request) {
                request.items = request.items.filter(itemId => !itemId.equals(deletedItem._id));
                return request.save();
            } else {
                return Promise.resolve();
            }
        });

const Item = mongoose.model('Item', itemSchema);

export default Item;
