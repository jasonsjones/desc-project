export enum ItemCategory {
    ENGAGEMENT = 'engagement',
    HOUSEHOLD = 'household'
}

export type EngagementItems = 'games' | 'artwork' | 'candy/treats';
export type HouseholdItems =
    | 'bedding'
    | 'pillows'
    | 'plates'
    | 'cutlery'
    | 'pots and pans'
    | 'napkins/paper towels'
    | 'shower curtain';

type OtherItem = 'other';

export interface ItemData {
    name: EngagementItems | HouseholdItems | OtherItem;
    requestorId: string;
}

export interface EngagementItemData extends ItemData {
    name: EngagementItems;
}
