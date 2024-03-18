import express from "express";
import {
    createPetugas,
    loginPetugas,
    deletePetugas,
    getPetugas,
    getPetugasById,
    updatePetugas
} from "../controllers/petugasController.js";

const router = express.Router();

router.get('/petugas', getPetugas)
router.get('/petugas/:id', getPetugasById)
router.post('/petugas', createPetugas)
router.post('/petugas/login', loginPetugas)
router.patch('/petugas', updatePetugas)
router.delete('/petugas', deletePetugas)

export default router;