import bcrypt from "bcrypt";

export class HashProvider {
  async hash(secret: string) {
    return await bcrypt.hash(secret, 10);
  }

  async verify(hashedSecret: string, compareSecret: string) {
    return await bcrypt.compare(compareSecret, hashedSecret);
  }
}
