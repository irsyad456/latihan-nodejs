import express from "express";
import {
    getMasyarakat,
    getMasyarakatByNIK,
    createMasyarakat,
    deleteMasyarakat,
    updateMasyarakat,
    loginMasyarakat,
    logoutMasyarakat,
} from "../controllers/masyarakatController.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

router.get('/masyarakat', getMasyarakat)
router.get('/masyarakat/:nik', getMasyarakatByNIK)
router.post('/masyarakat', createMasyarakat)
router.patch('/masyarakat', updateMasyarakat)
router.delete('/masyarakat', deleteMasyarakat)
router.post('/masyarakat/login', loginMasyarakat)
router.get('/masyarakat-token', refreshToken)
router.delete('/masyarakat/logout', logoutMasyarakat)

export default router;