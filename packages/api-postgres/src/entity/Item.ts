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
import { ItemCategory, ItemPriority, ItemStatus, HouseLocation } from '../item/types';

@Entity()
export default class Item extends BaseEntity {
    // clientRequest -> ClientRequest
    // notes -> Notes[]

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientId: string;

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

    @Column({ type: 'enum', enum: ItemStatus, default: ItemStatus.ACTIVE })
    status: ItemStatus;

    @Column({ type: 'enum', enum: HouseLocation })
    location: HouseLocation;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    toClientJSON(): Item {
        return {
            ...this,
            submittedBy: this.submittedBy.toClientJSON()
        };
    }
}
