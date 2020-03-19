import { Column, ChildEntity } from 'typeorm';
import Item from './Item';

@ChildEntity()
export class HouseholdItem extends Item {
    @Column()
    name: string;
}