import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { GameOrmEntity } from "./GameEntity";

@Entity("developers")
export class DeveloperOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  headquartersCountry!: string;

  @Column()
  officialWebsite!: string;

  @OneToMany(() => GameOrmEntity, (game) => game.developer)
  games!: GameOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
