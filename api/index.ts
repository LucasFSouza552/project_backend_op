import "dotenv/config";
import connectDB from "../src/database/mongo.js";
import app from "../src/index.js";

let isConnected = false;

export default async (req: any, res: any) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    return app(req, res);
};
