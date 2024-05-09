import { PrismaClient } from "@prisma/client";

//singleton
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
}

export const prisma = 
globalForPrisma.prisma ??
 new PrismaClient({
    log: ["query"],
 });

 if(process.env.NODE_ENV === "development"){
    globalForPrisma.prisma = prisma;
 }

 export type Todo = {
    id: string;
    title: string;
    complete: boolean;
    createdAt: Date;
    updatedAt: Date;
}