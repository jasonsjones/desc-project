import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import User from './User';
import Item from './Item';

@Entity()
export default class Note extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    body: string;

    @ManyToOne(() => User)
    @JoinColumn()
    submittedBy: User;

    @ManyToOne(() => Item)
    @JoinColumn()
    item: Item;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
