import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Item extends BaseEntity {
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
