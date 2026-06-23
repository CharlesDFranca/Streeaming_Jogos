import "reflect-metadata";
import { SubscriptionOrmEntity } from "@modules/subscriptions/infra/database/entities/SubscriptionEntity/";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { Timestamp } from "typeorm/driver/mongodb/bson.typings.js";

@Entity("users")
export class UserOrmEntity {
    @PrimaryColumn({ type: "uuid" })
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ unique: true, type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @OneToMany(
        () => SubscriptionOrmEntity,
        sub => sub.user
    )
    subscriptions!: SubscriptionOrmEntity[];

    @CreateDateColumn({ type: "time with time zone" })
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
