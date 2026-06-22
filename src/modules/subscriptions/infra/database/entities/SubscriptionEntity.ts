import { UserOrmEntity } from "@modules/users/infra/database/entities/UserEntity/";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PlanOrmEntity } from "./PlanEntity";

@Entity("subscriptions")
export class SubscriptionOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  userId!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  status!: string;

  @ManyToOne(() => UserOrmEntity, (user) => user.subscriptions)
  user!: UserOrmEntity;

  @ManyToOne(() => PlanOrmEntity)
  plan!: PlanOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
