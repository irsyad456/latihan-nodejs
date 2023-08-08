import express from "express";
import {
    createPetugas,
    loginPetugas
} from "../controllers/petugasController.js";

const router = express.Router();

router.post('/petugas', createPetugas)
router.post('/petugas/login', loginPetugas)

export default router;