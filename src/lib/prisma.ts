import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  var prisma: PrismaClient | undefined;
}

// In Prisma 7, we initialize the Adapter Factory with a config object
const adapter = new PrismaBetterSqlite3({
  url: "dev.db",
});

export const prisma =
  global.prisma ||
  new PrismaClient({
    // @ts-ignore - Prisma 7 handles the factory/adapter connection internally
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;