import { CreateIdentityDTO } from "../DTOs/CreateIdentityDTO";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IIdentityRepository } from "../../dataAccess/IdentityRepository";
import { JWTProvider } from "../../../providers/JWTProvider";
import { HashProvider } from "../../../providers/HashProvider";

export class CreateIdentityUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private JWTProvider: JWTProvider,
    private hashProvider: HashProvider
  ) {}
  async execute({ secret, email, phone }: CreateIdentityDTO) {
    const foundIdentity = await this.identityRepository.findIdentity(email);

    if (foundIdentity) {
      throw new Error("identity is not unique.");
    }

    const hashedSecret = await this.hashProvider.hash(secret);

    const identity = await this.identityRepository.createIdentity({
      email,
      secret: hashedSecret,
      phone,
    });

    const jsonwebtoken = this.JWTProvider.createJWT(email);

    return {
      data: {
        jwt: jsonwebtoken,
        identity,
      },
    };
  }
}
