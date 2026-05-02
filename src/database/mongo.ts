import mongoose from "mongoose";

export let gridFSBucket: InstanceType<typeof mongoose.mongo.GridFSBucket>;

export default async function connectDB(): Promise<void> {
    if (mongoose.connection.readyState) {
        return;
    }
    try {
        console.log("Conectando ao banco de dados...");
        await mongoose.connect(process.env.DATABASE_URL!);

        const db = await new Promise<mongoose.mongo.Db>((resolve, reject) => {
            const conn = mongoose.connection;
            if (conn.db) return resolve(conn.db);
            conn.once("open", () => {
                if (!conn.db) return reject(new Error("DB não inicializado"));
                resolve(conn.db);
            });
            conn.once("error", (err) => reject(err));
        });
        if (!db) {
            throw new Error("DB não inicializado");
        }

        gridFSBucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "images",
        });

        console.log("✅ MongoDB + GridFS conectado");
    } catch (error) {
        console.log("Connection error:", error);
    }
}
