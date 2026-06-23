import "reflect-metadata";
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GameOrmEntity } from "./GameEntity";

@Entity("categories")
export class CategoryOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ unique: true, type: "varchar" })
    name!: string;

    @ManyToMany(
        () => GameOrmEntity,
        game => game.categories
    )
    games!: GameOrmEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
