import express from "express";
import {
    getTanggapan,
    getTanggapanById,
    saveTanggapan,
    updateTanggapan,
    deleteTanggapan
} from "../controllers/tanggapanController.js";


const router = express.Router();

router.get('/Tanggapan', getTanggapan)
router.get('/Tanggapan/:id', getTanggapanById)
router.post('/Tanggapan/:id', saveTanggapan)
router.patch('/Tanggapan/:id', updateTanggapan)
router.delete('/Tanggapan/:id', deleteTanggapan)

export default router;