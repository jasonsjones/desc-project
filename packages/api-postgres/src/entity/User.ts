import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('varchar', { unique: true, length: 255 })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
