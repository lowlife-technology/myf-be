import { Request, Response } from "express";
import { object, string } from "zod";
import { CreateIdentityUseCase } from "../domain/useCases/CreateIdentityUseCase";

const identitySchema = object({
  email: string().email(),
  phone: string().regex(/^\d{11}$/),
  secret: string().min(8),
});

export class CreateIdentityController {
  constructor(private createIdentityUseCase: CreateIdentityUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const validatedData = identitySchema.parse(req.body);

      const { email, phone, secret } = req.body;

      if (!email || !secret) {
        return res.send(400).json({
          data: null,
          message: "email and secret is obrigatory.",
        });
      }

      const createIdentityUseCase = await this.createIdentityUseCase.execute({
        secret,
        email,
        phone,
      });

      return res.status(201).json(createIdentityUseCase);
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: (error as any).message,
      });
    }
  }
}
