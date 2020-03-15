import {
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import User from './User';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'category' } })
export default abstract class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn()
    submittedBy: User;

    // clientId: string;
    // clientRequest -> ClientRequest
    // submittedBy -> User
    // location: string;
    // numberOfItems: number;
    // urgency: string;
    // status: string;
    // notes -> Notes[]
}
