
const JWT_SECRET  = process.env.JWT_SECRET;
import {
  authenticate,
  fetch,
  create,
  ping,
  fallback
} from './controllers';
import { authVerify } from "./auth";
import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

//check cors?
router.use(bodyParser.json());

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env");
};
const confirmToken = authVerify(JWT_SECRET);

router.post("/auth", authenticate);
router.get("/alive", ping);
router.get("/movies", confirmToken, fetch);
router.post("/movies", confirmToken, create);
router.all("/*", fallback);
router.use((error, _, res, __) => {
  console.error(`Processing err: ${error}`);
  return res.status(500).json({ error: "Processing error" });
});

export {router};
