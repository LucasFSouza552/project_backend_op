import { BaseRepository } from "../repositories/BaseRepository";

export class BaseService<T,
    CreateInput,
    UpdateInput> {
    constructor(protected repository: BaseRepository<
        T,
        CreateInput,
        UpdateInput>) { }

    getAll() {
        return this.repository.findAll();
    }

    getOne(id: string) {
        return this.repository.findById(id);
    }

    create(data: CreateInput) {
        return this.repository.create(data);
    }

    update(id: string, data: UpdateInput) {
        return this.repository.update(id, data);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }
}