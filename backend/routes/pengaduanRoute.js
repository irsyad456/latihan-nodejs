import express from "express";
import {
    getPengaduan,
    getPengaduanById,
    savePengaduan,
    updatePengaduan,
    deletePengaduan
} from "../controllers/pengaduanController.js";


const router = express.Router();

router.get('/pengaduan', getPengaduan)
router.get('/pengaduan/:id', getPengaduanById)
router.post('/pengaduan', savePengaduan)
router.patch('/pengaduan/:id', updatePengaduan)
router.delete('/pengaduan/:id', deletePengaduan)

export default router;