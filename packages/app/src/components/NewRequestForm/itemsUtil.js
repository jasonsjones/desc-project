import availableItems from './availableItems';

/**
 * Get all item categories
 */
export const getCategories = () => {
    return Object.keys(availableItems);
};
/**
 * Get types of items within given category
 */
export const getItemsInCategory = category => {
    if (availableItems[category]) {
        return Object.keys(availableItems[category]);
    } else {
        return [];
    }
};

/**
 * Returns true if itemType in category has gender options
 */
export const isItemGendered = (category, itemType) => {
    const result = Object.keys(availableItems)
        .filter(cat => cat === category)
        .map(cat => !!(availableItems[cat][itemType] || {}).gender)
        .some(isGendered => isGendered);

    return result;
};

// If item with is sized by given gender, return sizes for gender
export const getItemGenderSizes = (category, itemType, itemGender) => {
    // const result = Object.keys(availableItems)
    //     .filter(cat => cat === category)
    //     .map(cat => cat[itemType] || {});
    // console.log(result);
    // return result;
    return (
        ((((availableItems || {})[category] || {})[itemType] || {}).gender || {})[itemGender] || {}
    ).sizes;
};
