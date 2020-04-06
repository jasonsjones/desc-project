export enum ItemCategory {
    ENGAGEMENT = 'engagement',
    HOUSEHOLD = 'household'
}

export enum ItemPriority {
    URGENT = 'urgent',
    STANDARD = 'standard'
}

export enum ItemStatus {
    ACTIVE = 'active',
    APPROVED = 'approved',
    DENIED = 'denied',
    FUFILLED = 'fulfilled',
    WISHLIST = 'wishlist',
    ARCHIVED = 'archived'
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
    clientId: string;
    category: ItemCategory;
    name: EngagementItems | HouseholdItems;
    quantity?: number;
    priority?: ItemPriority;
    requestorId: string;
}

export interface UpdatableItemFields {
    category?: ItemCategory;
    name?: string;
    priority?: ItemPriority;
    quantity?: number;
    status?: ItemStatus;
}
