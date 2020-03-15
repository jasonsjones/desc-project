import { Entity, PrimaryGeneratedColumn, TableInheritance, BaseEntity } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'category' } })
export default abstract class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // clientId: string;
    // clientRequest -> ClientRequest
    // submittedBy -> User
    // location: string;
    // numberOfItems: number;
    // urgency: string;
    // status: string;
    // notes -> Notes[]
}
