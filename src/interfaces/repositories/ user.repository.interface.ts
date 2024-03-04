import User from "../../entities/user.entity";
import { UserInput, UserOutput } from "../entities/user.entity.interface";
import { UserPersistenceOutput } from "../entities/user.persistence.entity.interface";
import { mapEntityToDomain } from "./map-entity-to-domain.interface";

type OutputAndMap = UserPersistenceOutput & mapEntityToDomain<UserOutput>

export interface UserRepository {
	create(input: User): Promise<OutputAndMap>;
  update(id: string, input: Partial<UserInput>): Promise<OutputAndMap>;
	delete(id: string): Promise<boolean>
	findById(id: string): Promise<OutputAndMap | null>
}

