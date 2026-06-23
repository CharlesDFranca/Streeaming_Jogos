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
    // url: "host=localhost port=5432 dbname=streaming_database user=postgres password=xxxxxxx connect_timeout=10 sslmode=prefer",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "A37hu3AM!",
    database: "streaming_database",
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
