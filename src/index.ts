import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { object, string, number, any } from "zod";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const prisma = new PrismaClient();

const identitySchema = object({
  email: string().email(),
  phone: string().regex(/^\d{11}$/), // Assuming a 10-digit phone number format
  secret: string().min(8), // Assuming a minimum length of 8 characters for the secret
});

app.get("/", (req, res) => {});

app.post("/identity", async (req, res) => {
  try {
    // Validate data using Zod
    const validatedData = identitySchema.parse(req.body);

    if (validatedData) {
    }

    // get data
    const { email, phone, secret } = req.body;

    // validate data
    if (!email || !secret) {
      return res.send(400).json({
        data: null,
        message: "email and secret is obrigatory.",
      });
    }

    // validade if valid email and valid phone and if secret is good

    // validate unique
    const foundIdentity = await prisma.identity.findFirst({
      where: { email, OR: [{ phone }] },
    });

    if (foundIdentity) {
      return res.status(400).json({
        data: null,
        message: "identity is not unique.",
      });
    }

    // hash secret
    const hashedSecret = await bcrypt.hash(secret, 10);

    // save data database
    const identity = await prisma.identity.create({
      data: {
        email,
        id: uuid(),
        secret: hashedSecret,
        phone,
      },
    });

    // generate jwt
    const jsonwebtoken = jwt.sign({ email }, "myf-backend-key");

    // send response
    return res.status(201).json({
      data: {
        jwt: jsonwebtoken,
        identity,
      },
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: (error as any).message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`running! ${PORT}`);
});

/*
    const { message } = error as {
      message: string | { message: { message: string }[] };
    };


    if (message.hasOwnProperty("message") && typeof message === "object") {
      return res.status(500).json({
        data: null,
        message: message.message[1].message,
      });
    }

*/
