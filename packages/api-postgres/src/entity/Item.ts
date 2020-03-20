import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    // TableInheritance,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import User from './User';
// import { HouseholdItems } from '../item/types';
// import { EngagementItems } from '../item/types';

@Entity()
// @TableInheritance({ column: { type: 'varchar', name: 'category' } })
export default class Item extends BaseEntity {
    // protected abstract name: EngagementItems | HouseholdItems;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: string;

    @Column()
    name: string;

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

    toClientJSON = () => {
        return {
            ...this,
            submittedBy: this.submittedBy.toClientJSON()
        };
    };
}
