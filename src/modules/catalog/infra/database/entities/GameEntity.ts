import "reflect-metadata";
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { DeveloperOrmEntity } from "./DeveloperEntity";
import { CategoryOrmEntity } from "./CategoryEntity";

@Entity("games")
export class GameOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    title!: string;

    @Column("text")
    description!: string;

    @Column({ type: "date" })
    releaseDate!: Date;

    @Column({ type: "integer" })
    minimumAge!: number;

    @Column({ type: "varchar" })
    developerId!: string;

    @ManyToOne(
        () => DeveloperOrmEntity,
        dev => dev.games
    )
    developer!: DeveloperOrmEntity;

    @ManyToMany(
        () => CategoryOrmEntity,
        cat => cat.games,
        {
            cascade: true
        }
    )
    @JoinTable({
        name: "game_categories"
    })
    categories!: CategoryOrmEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
