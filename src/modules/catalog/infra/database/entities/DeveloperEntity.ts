import "reflect-metadata";
import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GameOrmEntity } from "./GameEntity";

@Entity("developers")
export class DeveloperOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    headquartersCountry!: string;

    @Column({ type: "varchar" })
    officialWebsite!: string;

    @Column({ type: "integer" })
    foundationYear!: number;

    @OneToMany(
        () => GameOrmEntity,
        game => game.developer
    )
    games!: GameOrmEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
