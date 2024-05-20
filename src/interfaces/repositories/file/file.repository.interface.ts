import FilePersistence from "../../../entities/file.persistence.entity";
import { FileOutput, Ifile } from "../../entities/file.entity.interface";
import { FilePersistenceOutput } from "../../entities/file.persistence.entity.interface";
import { mapEntityToDomain } from "../map-entity-to-domain.interface";

type OutputAndMap = FilePersistenceOutput & mapEntityToDomain<FileOutput>

export interface FileRepository {
	create(fileRepository: FilePersistence): Promise<OutputAndMap>;
  update(fileRepository: FilePersistence): Promise<OutputAndMap>;
	delete(id: string): Promise<boolean>
	findById(id: string): Promise<OutputAndMap | null>
}
