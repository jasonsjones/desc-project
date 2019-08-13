/**
 * Utility to get information about available items
 */
class ItemOptionsUtility {
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
}

export default ItemOptionsUtility;
