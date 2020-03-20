import Item from '../entity/Item';
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
        item = Item.create({ category: category.valueOf(), name });
        item.submittedBy = requestor;

        return item.save();
    }

    static getAllItems(): Promise<Item[]> {
        return Item.find({ relations: ['submittedBy'] });
    }
}
