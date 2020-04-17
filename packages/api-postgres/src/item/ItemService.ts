import Item from '../entity/Item';
import { ItemData, UpdatableItemFields } from './types';
import UserService from '../user/UserService';
import NoteService from '../note/NoteService';

export default class ItemService {
    static async createItem(itemData: ItemData): Promise<Item | undefined> {
        const {
            clientId,
            category,
            name,
            priority,
            quantity,
            requestorId,
            status,
            location,
            note
        } = itemData;
        const requestor = await UserService.getUserById(requestorId);

        if (!requestor) {
            throw new Error('Invalid requestor');
        }

        const item = Item.create({
            clientId,
            category,
            name,
            priority,
            quantity,
            status,
            location
        });
        item.submittedBy = requestor;

        if (note) {
            const tempNote = NoteService.createNoteForItem({ body: note.body });
            tempNote.submittedBy = requestor;
            tempNote.item = item;
            item.notes = [tempNote];
        }

        return item.save();
    }

    static getAllItems(): Promise<Item[]> {
        return Item.find({ relations: ['submittedBy', 'notes'] });
    }

    static getItemById(id: string): Promise<Item | undefined> {
        return Item.findOne({ where: { id }, relations: ['submittedBy', 'notes'] });
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
