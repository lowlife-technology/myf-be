import { Request, Response } from "express";
import { FindIdentityUseCase } from "../domain/useCases/FindIdentityUseCase";

export class FindIdentityController {
  constructor(private findIdentityUseCase: FindIdentityUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { email } = req.query as { email: string };

      if (!email) {
        return res.send(400).json({
          data: null,
          message: "A credential is required",
        });
      }

      const findIdentityUseCase = await this.findIdentityUseCase.execute({
        email,
      });

      return res.status(200).json(findIdentityUseCase);
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: (error as any).message,
      });
    }
  }
}
