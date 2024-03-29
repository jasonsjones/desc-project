import { ItemCategory } from './enums';
import { BaseItemFields } from './items';

// Other
export const availableOtherItems = ['other'] as const;

export type OtherItems = typeof availableOtherItems[number];

export interface OtherFields extends BaseItemFields {
    category: ItemCategory.OTHER;
    name: OtherItems;
}
