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

    @Column()
    emailVerificationToken: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ default: 0 })
    resetTokenVersion: number;

    @Column({ default: '' })
    passwordResetToken: string;

    @Column({ default: new Date() })
    passwordResetTokenExpiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
