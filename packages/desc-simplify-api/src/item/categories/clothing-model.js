import mongoose from 'mongoose';

import Item from '../baseitem-model';
import {
    menShirtCoatSizes,
    menPantSizes,
    menShoeSizes,
    womenShirtCoatSizes,
    womenPantSizes,
    womenShoeSizes,
    womenBraSizes,
    socksAndUnderwearSizes
} from './sizes';

const Schema = mongoose.Schema;

const SIZES = {
    M: {
        shirt: menShirtCoatSizes,
        coat: menShirtCoatSizes,
        pants: menPantSizes,
        shoes: menShoeSizes,
        socks: socksAndUnderwearSizes,
        underwear: socksAndUnderwearSizes
    },
    F: {
        shirt: womenShirtCoatSizes,
        coat: womenShirtCoatSizes,
        pants: womenPantSizes,
        bra: womenBraSizes,
        shoes: womenShoeSizes,
        socks: socksAndUnderwearSizes,
        underwear: socksAndUnderwearSizes
    }
};

const CLOTHING_ITEMS = [
    'shirt',
    'pants',
    'coat',
    'shoes',
    'socks',
    'underwear',
    'bra',
    'scarf',
    'hat'
];

const options = {
    discriminatorKey: 'itemCategory',
    timestamps: true
};

const clothingItemSchema = new Schema(
    {
        gender: { type: String, enum: ['M', 'F'], required: true },
        name: { type: String, required: true },
        size: { type: String, required: true },
        style: { type: String, enum: ['casual', 'dress'] }
    },
    options
);

clothingItemSchema.path('size').validate(function(v) {
    const sizing = SIZES[this.gender];
    return sizing[this.name].includes(v);
});

clothingItemSchema.path('name').validate(function(v) {
    if (CLOTHING_ITEMS.includes(v)) return true;
});

const Clothing = Item.discriminator('Clothing', clothingItemSchema);

export default Clothing;
