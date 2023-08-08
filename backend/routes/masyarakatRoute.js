import express from "express";
import {
    createMasyarakat
} from "../controllers/masyarakatController.js";

const router = express.Router();

router.post('/masyarakat', createMasyarakat)

export default router;