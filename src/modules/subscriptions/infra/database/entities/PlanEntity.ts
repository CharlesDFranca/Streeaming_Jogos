import "reflect-metadata";
import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { SubscriptionOrmEntity } from "./SubscriptionEntity";

@Entity("plans")
export class PlanOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column("decimal")
    monthlyPrice!: number;

    @Column({ type: "varchar" })
    maxResolution!: string;

    @OneToMany(
        () => SubscriptionOrmEntity,
        sub => sub.plan
    )
    subscriptions!: SubscriptionOrmEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
