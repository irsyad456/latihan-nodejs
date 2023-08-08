import express from "express";
import {
    createPetugas
} from "../controllers/petugasController.js";

const router = express.Router();

router.post('/petugas', createPetugas)

export default router;