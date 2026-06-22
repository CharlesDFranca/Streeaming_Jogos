import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SubscriptionOrmEntity } from "./SubscriptionEntity";

@Entity("plans")
export class PlanOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column("decimal")
  monthlyPrice!: number;

  @Column()
  maxResolution!: string;

  @OneToMany(() => SubscriptionOrmEntity, (sub) => sub.plan)
  subscriptions!: SubscriptionOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
