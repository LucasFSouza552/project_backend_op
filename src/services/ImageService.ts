import { Types } from "mongoose";
const { ObjectId } = Types;
import { pipeline, Readable } from "stream";
import { gridFSBucket } from "../database/mongo.js";

export default class ImageService {

    static async upload(file: Express.Multer.File): Promise<string> {

        if (!file) {
            throw new Error("Arquivo não enviado");
        }

        if (!gridFSBucket) {
            throw new Error("GridFS não inicializado");
        }

        const uploadStream = gridFSBucket.openUploadStream(
            `${Date.now()}-${file.originalname}`,
            {
                metadata: {
                    contentType: file.mimetype
                }
            }
        );

        const readable = Readable.from(file.buffer);

        await new Promise((resolve, reject) => {
            readable
                .pipe(uploadStream)
                .on("finish", resolve)
                .on("error", reject);
        });

        return uploadStream.id.toString();
    }

    static async delete(fileId: string): Promise<void> {
        if (!gridFSBucket) {
            throw new Error("GridFS não inicializado");
        }

        await gridFSBucket.delete(new ObjectId(fileId));
    }

    static async getStream(fileId: string) {
        if (!gridFSBucket) {
            throw new Error("GridFS não inicializado");
        }

        return gridFSBucket.openDownloadStream(new ObjectId(fileId));
    }

}
