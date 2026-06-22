import { Plan } from "../entities/Plan";

export interface PlanRepository {
    findById(id: string): Promise<Plan | null>;
    listAll(): Promise<Plan[]>;
    save(plan: Plan): Promise<void>;
    delete(id: string): Promise<void>;
}
