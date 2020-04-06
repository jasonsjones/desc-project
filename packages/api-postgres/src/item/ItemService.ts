import Item from '../entity/Item';
import { ItemData, ItemCategory, ItemPriority, ItemStatus } from './types';
import UserService from '../user/UserService';

interface UpdatableItemFields {
    category?: ItemCategory;
    name?: string;
    priority?: ItemPriority;
    quantity?: number;
    status?: ItemStatus;
}

export default class ItemService {
    static async createItem(itemData: ItemData): Promise<Item | undefined> {
        const { category, name, priority, quantity, requestorId } = itemData;
        const requestor = await UserService.getUserById(requestorId);

        if (!requestor) {
            return;
        }
        const item = Item.create({ category, name, priority, quantity });
        item.submittedBy = requestor;

        return item.save();
    }

    static getAllItems(): Promise<Item[]> {
        return Item.find({ relations: ['submittedBy'] });
    }

    static getItemById(id: string): Promise<Item | undefined> {
        return Item.findOne({ where: { id }, relations: ['submittedBy'] });
    }

    static async updateItem(id: string, data: UpdatableItemFields): Promise<Item | undefined> {
        await Item.update({ id }, data);
        return ItemService.getItemById(id);
    }

    static async deleteItem(id: string): Promise<Item | undefined> {
        const item = await ItemService.getItemById(id);
        await Item.delete({ id });
        return item;
    }
}
