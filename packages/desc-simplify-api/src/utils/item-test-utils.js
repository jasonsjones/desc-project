export const getMockItemData = userId => {
    return {
        clothingItemWithNote: {
            clientId: '12345678',
            clientRequest: '5c0179dd9c55a711053087cb',
            submittedBy: userId,
            itemCategory: 'Clothing',
            numberOfItems: 1,
            name: 'coat',
            size: 'L (42-44)',
            gender: 'M',
            note: 'Need a warm coat for the fall season'
        },
        householdItemWithNote: {
            clientId: '12345678',
            clientRequest: '5c0179dd9c55a711053087cb',
            submittedBy: userId,
            itemCategory: 'Household',
            numberOfItems: 4,
            name: 'plates',
            note: 'Need some plates for a nice holiday dinner'
        },
        householdItemWithoutNote: {
            clientId: '12345678',
            clientRequest: '5c0179dd9c55a711053087cb',
            submittedBy: userId,
            itemCategory: 'Household',
            numberOfItems: 2,
            name: 'bedding'
        },
        personalHygieneItemWithoutNote: {
            clientId: '12345678',
            clientRequest: '5c0179dd9c55a711053087cb',
            submittedBy: userId,
            itemCategory: 'PersonalHygiene',
            numberOfItems: 1,
            name: 'toothbrush'
        }
    };
};
