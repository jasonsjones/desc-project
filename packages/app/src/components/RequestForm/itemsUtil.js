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
        .filter(cat => !!availableItems[cat][itemType].gender)
        .some(isGendered => isGendered);

    return result;
};

// If item with is sized by given gender, return sizes for gender
export const getItemGenderSizes = (category, itemType, itemGender) => {
    const result = Object.keys(availableItems)
        .filter(cat => cat === category)
        .filter(cat => !!availableItems[cat][itemType])
        .filter(cat => !!availableItems[cat][itemType].gender)
        .filter(cat => !!availableItems[cat][itemType].gender[itemGender])
        .map(cat => availableItems[cat][itemType].gender[itemGender].sizes);

    return result.length > 0 ? result[0] : [];
};

export const getItemNonGenderSizes = (category, itemType) => {
    const result = Object.keys(availableItems)
        .filter(cat => cat === category)
        .filter(cat => !!availableItems[cat][itemType])
        .map(cat => availableItems[cat][itemType].sizes);

    return result.length > 0 ? result[0] : [];
};

export const isItemFemaleOnly = (category, itemType) => {
    const result = Object.keys(availableItems)
        .filter(cat => cat === category)
        .filter(cat => !!availableItems[cat][itemType])
        .filter(cat => !!availableItems[cat][itemType].gender)
        .map(cat => availableItems[cat][itemType].gender);

    console.log(result);
    let gender = [];
    if (result.length > 0) {
        gender = Object.keys(result[0]);
    }

    return gender.length === 1 && gender.includes('Female');
};

export const getBraSizes = () => {
    return availableItems['Clothing']['Bra'].gender['Female'].sizes;
};
