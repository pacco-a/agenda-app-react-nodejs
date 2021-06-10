import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resume: string;

    @Column()
    details: string;

    @Column()
    date: Date;

    @Column()
    color: string;

    @Column()
    userId: number;

    @Column({
        default: false,
    })
    done: boolean;
}
