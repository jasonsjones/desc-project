import { Column, ChildEntity } from 'typeorm';
import Item from './Item';
import { HouseholdItems } from '../item/types';

@ChildEntity()
export class HouseholdItem extends Item {
    @Column()
    name: HouseholdItems;
}
