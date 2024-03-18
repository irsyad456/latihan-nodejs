import express from "express";
import {
    getTanggapan,
    getTanggapanById,
    saveTanggapan,
    updateTanggapan,
    deleteTanggapan
} from "../controllers/tanggapanController.js";


const router = express.Router();

router.get('/tanggapan', getTanggapan)
router.get('/tanggapan/:id', getTanggapanById)
router.post('/tanggapan', saveTanggapan)
router.patch('/tanggapan', updateTanggapan)
router.delete('/tanggapan/:id', deleteTanggapan)

export default router;