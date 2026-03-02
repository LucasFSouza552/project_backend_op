import { prisma } from "../lib/prisma";

export class BaseRepository<
    T,
    CreateInput,
    UpdateInput> {
    constructor(protected model: any) { }

    async findAll(params?: any): Promise<T[]> {
        return this.model.findMany(params);
    }

    async findById(id: string, include?: any): Promise<T | null> {
        return this.model.findUnique({
            where: { id },
            include
        });
    }

    async create(data: CreateInput): Promise<T> {
        return this.model.create({ data });
    }

    async update(id: string, data: UpdateInput): Promise<T> {
        return this.model.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<T> {
        return this.model.delete({
            where: { id }
        });
    }

    async deleteWhere(where: any): Promise<T> {
        return this.model.delete({ where });
    }
}