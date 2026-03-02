import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function withDatabaseNameIfMissing(rawUrl: string): string {
  const u = new URL(rawUrl);

  if (u.pathname === "/" || u.pathname === "") {
    const dbName = process.env.DATABASE_NAME ?? "teste";
    u.pathname = `/${dbName}`;
  }

  return u.toString();
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL não definido. Configure no arquivo .env.");
}

const normalizedDatabaseUrl = withDatabaseNameIfMissing(databaseUrl);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: normalizedDatabaseUrl } },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
