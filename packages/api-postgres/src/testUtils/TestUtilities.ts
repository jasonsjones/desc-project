import { getConnection } from 'typeorm';
import User from '../entity/User';
import Item from '../entity/Item';
import Note from '../entity/Note';

class TestUtilities {
    public static async deleteUserByEmail(email: string): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('email = :email', { email })
            .execute();
    }

    public static async dropItems(): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Item)
            .execute();
    }

    public static async dropUsers(): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .execute();
    }

    public static async dropNotes(): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Note)
            .execute();
    }
}

export default TestUtilities;
