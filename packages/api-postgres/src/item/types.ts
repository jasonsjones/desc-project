export enum ItemCategory {
    ENGAGEMENT = 'engagement',
    HOUSEHOLD = 'household'
}

// export enum EngagementItems {
//     GAMES = 'games',
//     ARTWORK = 'artwork',
//     CANDY_TREATS = 'candy/treats'
// }

// export enum HouseholdItems {
//     BEDDING = 'bedding',
//     PILLOWS = 'pillows',
//     PLATES = 'plates',
//     OTHER = 'other'
// }

// export type HouseholdItems =
//     | 'bedding'
//     | 'pillows'
//     | 'plates'
//     | 'cutlery'
//     | 'pots and pans'
//     | 'napkins/paper towels'
//     | 'shower curtain';

// type OtherItem = 'other';

export interface ItemData {
    name: string;
    requestorId: string;
}
