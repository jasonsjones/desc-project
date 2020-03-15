export enum ItemCategory {
    ENGAGEMENT = 'engagement',
    HOUSEHOLD = 'household'
}

export type EngagementItems = 'games' | 'artwork' | 'candy/treats';
export type HouseholdItems = 'bedding' | 'pillows';

export interface ItemData {
    name: EngagementItems | HouseholdItems;
}
