import { GameOrmEntity } from "@modules/catalog/infra/database/entities/GameEntity/";
import { UserOrmEntity } from "@modules/users/infra/database/entities/UserEntity/";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("game_sessions")
export class GameSessionOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  userId!: string;

  @Column()
  gameId!: string;

  @Column()
  startDate!: Date;

  @Column()
  startTime!: string;

  @Column()
  playedMinutes!: number;

  @Column()
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
