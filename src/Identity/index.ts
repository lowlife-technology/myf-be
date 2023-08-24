import { Router } from "express";
import { CreateIdentityController } from "./controllers/CreateIdentityController";
import { CreateIdentityUseCase } from "./domain/useCases/CreateIdentityUseCase";
import { IdentityRepository } from "./dataAccess/IdentityRepository";
import { JWTProvider } from "../providers/JWTProvider";
import { HashProvider } from "../providers/HashProvider";

const identityRouter = Router();
const jwtProvider = new JWTProvider();
const hashProvider = new HashProvider();
const createIdentityUseCase = new CreateIdentityUseCase(
  IdentityRepository,
  jwtProvider,
  hashProvider
);
const createIdentityController = new CreateIdentityController(createIdentityUseCase);

// Create new account
identityRouter.post("/identity", (req, res) => {
  createIdentityController.handle(req, res);
});

export { identityRouter };
