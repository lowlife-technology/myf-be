import { PrismaClient } from "@prisma/client";
import { Identity } from "../domain/entities/Identity";

const prisma = new PrismaClient();

export interface IIdentityRepository {
  createIdentity(identity: Omit<Identity, "id">): Promise<Identity>;
  findIdentity(email: string): Promise<Identity | null>;
}

export const IdentityRepository: IIdentityRepository = class {
  static async createIdentity(identity: Omit<Identity, "id">): Promise<Identity> {
    return await prisma.identity.create({
      data: new Identity(identity),
    });
  }
  static async findIdentity(email: string): Promise<Identity | null> {
    return await prisma.identity.findUnique({
      where: {
        email,
      },
    });
  }
};
