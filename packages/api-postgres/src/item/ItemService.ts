import Item from '../entity/Item';
import { EngagementItem } from '../entity/EngagementItem';
import { HouseholdItem } from '../entity/HouseholdItem';
import { ItemCategory, ItemData, EngagementItems, HouseholdItems } from './types';

export default class ItemService {
    static createItem(category: ItemCategory, itemData: ItemData): Promise<Item> {
        let item: Item;
        const { name } = itemData;
        switch (category) {
            case ItemCategory.ENGAGEMENT:
                item = EngagementItem.create({ name: name as EngagementItems });
                break;
            case ItemCategory.HOUSEHOLD:
                item = HouseholdItem.create({ name: name as HouseholdItems });
                break;
        }
        return item.save();
    }
}
