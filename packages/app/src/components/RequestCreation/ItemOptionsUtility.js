/**
 * Utility to get information about available items
 */
class ItemOptionsUtility {
    /**
     * TODO: get labels for selects rather than api names
     */

    constructor() {
        this.state = {
            availableItems: require('./AvailableItems')
        };
    }

    /**
     * Get all item categories
     */
    getCategories() {
        return Object.keys(this.state.availableItems);
    }

    /**
     * Get types of items within given category
     */
    getItemsInCategory(category) {
        if (this.state.availableItems[category]) {
            return Object.keys(this.state.availableItems[category]);
        } else {
            return [];
        }
    }

    /**
     * Returns true if itemType in category has gender options
     */
    isItemGendered(category, itemType) {
        return (((this.state.availableItems || {})[category] || {})[itemType] || {}).gender;
    }

    getGenders() {
        return ['male', 'female'];
    }

    // If item is sized irrespective of gender, return sizes
    getItemSizesGeneric(category, itemType) {
        return (((this.state.availableItems || {})[category] || {})[itemType] || {}).sizes;
    }

    // If item with is sized by given gender, return sizes for gender
    getItemGenderSizes(category, itemType, itemGender) {
        return (
            ((((this.state.availableItems || {})[category] || {})[itemType] || {}).gender || {})[
                itemGender
            ] || {}
        ).sizes;
    }
}

export default ItemOptionsUtility;
