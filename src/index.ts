import express from "express";
import cors from "cors";

import { identityRouter } from "./Identity";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(identityRouter);

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`running! ${PORT}`);
});
