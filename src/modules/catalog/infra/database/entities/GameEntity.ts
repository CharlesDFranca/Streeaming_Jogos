import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DeveloperOrmEntity } from "./DeveloperEntity";
import { CategoryOrmEntity } from "./CategoryEntity";

@Entity("games")
export class GameOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  releaseDate!: Date;

  @Column()
  minimumAge!: number;

  @Column()
  developerId!: string;

  @ManyToOne(() => DeveloperOrmEntity, (dev) => dev.games)
  developer!: DeveloperOrmEntity;

  @ManyToMany(() => CategoryOrmEntity, (cat) => cat.games, {
    cascade: true,
  })
  @JoinTable({
    name: "game_categories",
  })
  categories!: CategoryOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
