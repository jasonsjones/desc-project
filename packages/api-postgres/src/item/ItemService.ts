import Item from '../entity/Item';
import { ItemData } from './types';
import UserService from '../user/UserService';

export default class ItemService {
    static async createItem(itemData: ItemData): Promise<Item | undefined> {
        let item: Item;
        const { category, name, priority, quantity, requestorId } = itemData;
        const requestor = await UserService.getUserById(requestorId);

        if (!requestor) {
            return;
        }
        item = Item.create({ category, name, priority, quantity });
        item.submittedBy = requestor;

        return item.save();
    }

    static getAllItems(): Promise<Item[]> {
        return Item.find({ relations: ['submittedBy'] });
    }

    static getItemById(id: string): Promise<Item | undefined> {
        return Item.findOne({ where: { id }, relations: ['submittedBy'] });
    }

    static async deleteItem(id: string): Promise<Item | undefined> {
        const item = await ItemService.getItemById(id);
        await Item.delete({ id });
        return item;
    }
}
