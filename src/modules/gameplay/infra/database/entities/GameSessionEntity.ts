import "reflect-metadata";
import { GameOrmEntity } from "@modules/catalog/infra/database/entities/GameEntity/";
import { UserOrmEntity } from "@modules/users/infra/database/entities/UserEntity/";
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("game_sessions")
export class GameSessionOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    userId!: string;

    @Column({ type: "varchar" })
    gameId!: string;

    @Column({ type: "date" })
    startDate!: Date;

    @Column({ type: "varchar" })
    startTime!: string;

    @Column({ type: "integer" })
    playedMinutes!: number;

    @Column({ type: "integer" })
    averagePingMs!: number;

    @ManyToOne(() => UserOrmEntity)
    user!: UserOrmEntity;

    @ManyToOne(() => GameOrmEntity)
    game!: GameOrmEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
