import Note from '../entity/Note';
import UserService from '../user/UserService';
import ItemService from '../item/ItemService';

interface NoteData {
    body: string;
    userId: string;
    itemId: string;
}
export default class NoteService {
    static async createNote(noteData: NoteData): Promise<Note | undefined> {
        const { body, userId, itemId } = noteData;
        const user = await UserService.getUserById(userId);
        const item = await ItemService.getItemById(itemId);

        if (!user) {
            throw new Error('Invalid user');
        }
        if (!item) {
            throw new Error('Invalid item');
        }

        const note = Note.create({ body });
        note.submittedBy = user;
        note.item = item;
        return note.save();
    }

    static createNoteForItem(noteData: NoteData): Note {
        const { body } = noteData;
        const note = Note.create({ body });
        return note;
    }

    static getAllNotes(): Promise<Note[]> {
        return Note.find({ relations: ['submittedBy', 'item'] });
    }

    static getNoteById(id: string): Promise<Note | undefined> {
        return Note.findOne({ where: { id }, relations: ['submittedBy', 'item'] });
    }
}
