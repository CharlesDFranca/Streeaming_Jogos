import { CategoryOrmEntity } from "@modules/catalog/infra/database/entities/CategoryEntity/";
import { DeveloperOrmEntity } from "@modules/catalog/infra/database/entities/DeveloperEntity/";
import { GameOrmEntity } from "@modules/catalog/infra/database/entities/GameEntity/";
import { GameSessionOrmEntity } from "@modules/gameplay/infra/database/entities/GameSessionEntity/";
import { PlanOrmEntity } from "@modules/subscriptions/infra/database/entities/PlanEntity/";
import { SubscriptionOrmEntity } from "@modules/subscriptions/infra/database/entities/SubscriptionEntity/";
import { UserOrmEntity } from "@modules/users/infra/database/entities/UserEntity/";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgresql://neondb_owner:npg_TK6ipoR2Yecb@ep-proud-bread-atwydstn-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    entities: [
        UserOrmEntity,
        GameOrmEntity,
        CategoryOrmEntity,
        DeveloperOrmEntity,
        GameSessionOrmEntity,
        PlanOrmEntity,
        SubscriptionOrmEntity
    ]
});
