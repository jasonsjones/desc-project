import Item from '../entity/Item';
import { EngagementItem } from '../entity/EngagementItem';
import { HouseholdItem } from '../entity/HouseholdItem';
import { ItemCategory, ItemData } from './types';
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
                item = EngagementItem.create({ name });
                item.submittedBy = requestor;
                break;
            case ItemCategory.HOUSEHOLD:
                item = HouseholdItem.create({ name });
                item.submittedBy = requestor;
                break;
        }
        return item.save();
    }

    static getAllItems(): Promise<Item[]> {
        return Item.find({ relations: ['submittedBy'] });
    }
}
