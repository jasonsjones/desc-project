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

export interface ItemData {
    category: ItemCategory;
    name: EngagementItems | HouseholdItems;
    requestorId: string;
}
