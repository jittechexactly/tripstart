import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @Index()
    id!: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    name!: string;

    @Column({
        type: "varchar",
        unique: true
    })
    @Index()
    email!: string;

    @Column({
        nullable: true,
        type: "varchar"
    })
    verificationOtp!: string | null;

    @Column({
        type: "timestamptz",
        nullable: true
    })
    otpExpiredAt!: Date | null;

    @Column({
        type: "boolean",
        default: false,
    })
    verified!: boolean;

    @UpdateDateColumn()
    updatedAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;

}