import { Column, ChildEntity } from 'typeorm';
import Item from './Item';
import { EngagementItems } from '../item/types';

@ChildEntity()
export class EngagementItem extends Item {
    @Column()
    name: EngagementItems;
}
