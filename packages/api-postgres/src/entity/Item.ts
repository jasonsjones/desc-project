import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import User from './User';
import { ItemCategory, ItemPriority } from '../item/types';

@Entity()
export default class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ItemCategory })
    category: ItemCategory;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ItemPriority, default: ItemPriority.STANDARD })
    priority: ItemPriority;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @ManyToOne(() => User)
    @JoinColumn()
    submittedBy: User;

    // clientId: string;
    // clientRequest -> ClientRequest
    // location: string;
    // status: string;
    // notes -> Notes[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    toClientJSON = () => {
        return {
            ...this,
            submittedBy: this.submittedBy.toClientJSON()
        };
    };
}
