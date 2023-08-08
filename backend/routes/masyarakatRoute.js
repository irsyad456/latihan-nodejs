import express from "express";
import {
    getMasyarakat,
    createMasyarakat,
    loginMasyarakat,
    authenticate
} from "../controllers/masyarakatController.js";

const router = express.Router();

router.get('/masyarakat', getMasyarakat)
router.post('/masyarakat', createMasyarakat)
router.post('/masyarakat/login', loginMasyarakat)
router.get('/masyarakat/auth', authenticate)

export default router;