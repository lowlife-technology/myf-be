import { IIdentityRepository } from "../../dataAccess/IdentityRepository";
import { FindIdentityDTO } from "../DTOs/FindIdentityDTO";

export class FindIdentityUseCase {
  constructor(private identityReposity: IIdentityRepository) {}

  async execute({ email }: FindIdentityDTO) {
    const foundIdentity = await this.identityReposity.findIdentity(email);

    if (foundIdentity) {
      return {
        data: {
          email: foundIdentity.email,
        },
        message: "Identity exists",
      };
    }

    return {
      data: {},
      message: "Identity doesnt exists",
    };
  }
}
