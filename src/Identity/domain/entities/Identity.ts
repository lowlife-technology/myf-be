import { v4 as uuid } from "uuid";

export class Identity {
  id: string;
  email: string;
  phone?: string;
  secret: string;

  constructor({ email, phone, secret }: Omit<Identity, "id">) {
    this.id = uuid();
    this.email = email;
    this.phone = phone;
    this.secret = secret;

    if (!this.email) throw new Error("Email or phone is required");
    // if (!validator.isStrongPassword(this.secret)) throw new Error("Invalid password format");
    // if (this.email && !validator.isEmail(this.email)) throw new Error("Invalid email format");
    // if (this.phone && !validator.isMobilePhone(this.phone)) throw new Error("Invalid phone format");
  }
}
