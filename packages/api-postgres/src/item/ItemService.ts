import Item from '../entity/Item';
import { EngagementItem } from '../entity/EngagementItem';
import { HouseholdItem } from '../entity/HouseholdItem';
import { ItemCategory, ItemData, EngagementItems, HouseholdItems } from './types';
import UserService from '../user/UserService';

export default class ItemService {
    static async createItem(category: ItemCategory, itemData: ItemData): Promise<Item | undefined> {
        let item: Item;
        const { name, requestorId } = itemData;
        const requestor = await UserService.getUserById(requestorId);

        if (!requestor) {
            return;
        }

        switch (category) {
            case ItemCategory.ENGAGEMENT:
                item = EngagementItem.create({ name: name as EngagementItems });
                item.submittedBy = requestor;
                break;
            case ItemCategory.HOUSEHOLD:
                item = HouseholdItem.create({ name: name as HouseholdItems });
                item.submittedBy = requestor;
                break;
        }
        return item.save();
    }
}
