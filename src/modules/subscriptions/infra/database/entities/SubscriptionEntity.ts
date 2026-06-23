import "reflect-metadata";
import { UserOrmEntity } from "@modules/users/infra/database/entities/UserEntity/";
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { PlanOrmEntity } from "./PlanEntity";

@Entity("subscriptions")
export class SubscriptionOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    userId!: string;

    @Column({ type: "date" })
    startDate!: Date;

    @Column({ type: "date" })
    endDate!: Date;

    @Column({ type: "varchar" })
    status!: string;

    @ManyToOne(
        () => UserOrmEntity,
        user => user.subscriptions
    )
    user!: UserOrmEntity;

    @ManyToOne(() => PlanOrmEntity)
    plan!: PlanOrmEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
