import Item from '../entity/Item';
import { ItemFields, UpdatableItemFields } from '../common/types/items';
import UserService from '../user/UserService';
import NoteService from '../note/NoteService';
import { getEntityManager } from '../common/entityUtils';

export default class ItemService {
    static async createItem(itemData: ItemFields): Promise<Item> {
        const em = getEntityManager();
        const {
            clientId,
            category,
            name,
            size,
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

        const item = em.create(Item, {
            clientId,
            category,
            name,
            size,
            priority,
            quantity,
            status,
            location
        });
        item.submittedBy = requestor;

        if (note) {
            const tempNote = NoteService.createNoteForItem({ body: note });
            tempNote.submittedBy = requestor;
            tempNote.item = item;
            item.notes = [tempNote];
        }

        return em.save(item);
    }

    static getAllItems(query = {}): Promise<Item[]> {
        return getEntityManager().find(Item, {
            where: query,
            relations: ['submittedBy', 'notes', 'notes.submittedBy']
        });
    }

    static getItemById(id: string): Promise<Item | undefined> {
        return getEntityManager().findOne(Item, {
            where: { id },
            relations: ['submittedBy', 'notes', 'notes.submittedBy']
        });
    }

    static async updateItem(id: string, data: UpdatableItemFields): Promise<Item | undefined> {
        await getEntityManager().update(Item, { id }, data);
        return ItemService.getItemById(id);
    }

    static async deleteItem(id: string): Promise<Item | undefined> {
        const item = await ItemService.getItemById(id);
        await getEntityManager().delete(Item, { id });
        return item;
    }

    static async addNoteToItem(noteData: {
        body: string;
        itemId: string;
        authorId: string;
    }): Promise<Item | undefined> {
        const { body, itemId, authorId } = noteData;
        const author = await UserService.getUserById(authorId);
        const item = await ItemService.getItemById(itemId);

        if (!author) {
            throw new Error('Invalid author');
        }

        if (!item) {
            throw new Error('Invalid item');
        }

        const note = NoteService.createNoteForItem({ body });
        note.submittedBy = author;
        note.item = item;
        item.notes = [...item.notes, note];
        await getEntityManager().save(item);

        return ItemService.getItemById(itemId);
    }

    static async deleteNoteFromItem(noteData: {
        noteId: string;
        itemId: string;
    }): Promise<Item | undefined> {
        const { noteId, itemId } = noteData;
        const item = await ItemService.getItemById(itemId);
        if (!item) {
            throw new Error('Invalid item');
        }
        const deletedNote = await NoteService.deleteNote(noteId);
        if (!deletedNote) {
            throw new Error('Invalid note');
        }
        item.notes = item?.notes.filter((note) => note.id !== noteId);

        return ItemService.getItemById(itemId);
    }
}
