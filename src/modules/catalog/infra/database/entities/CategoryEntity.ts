import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { GameOrmEntity } from "./GameEntity";

@Entity("categories")
export class CategoryOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => GameOrmEntity, (game) => game.categories)
  games!: GameOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
