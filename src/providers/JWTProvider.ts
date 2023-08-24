import { sign, verify } from "jsonwebtoken";

export class JWTProvider {
  secret: string;
  constructor() {
    this.secret = "sad";
  }
  createJWT(email: string) {
    return sign({ email }, this.secret);
  }
  verifyJWT(jwt: string) {
    return verify(jwt, this.secret);
  }
}
