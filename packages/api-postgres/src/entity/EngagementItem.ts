import { Column, ChildEntity } from 'typeorm';
import Item from './Item';

@ChildEntity()
export class EngagementItem extends Item {
    @Column()
    name: string;
}
