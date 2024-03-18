import petugas from "../models/petugasModel.js";
import jwt from "jsonwebtoken";

export const getPetugas = async (req, res) => {
    try {
        const responses = await petugas.findAll();
        res.status(200).json(responses)
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: "Error" })
    }
}

export const getPetugasById = async (req, res) => {
    try {
        const response = await petugas.findOne({ where: { id: req.params.id } });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ msg: 'Error' })
    }
}

export const loginPetugas = async (req, res) => {
    const username = req.body.username;
    const password = req.body.pass;

    if (!username && !password) {
        return res.status(400).json({ msg: "Username or password cannot null" });
    }

    try {
        const user = await petugas.findOne({ where: { username: username } });
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!user && !passwordMatch) {
            return res.status(401).json({ msg: "Invalid Username Or Password" });
        }

        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({ success: true, token, msg: "Please save The token For Authenticate" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Some Error Occured, Please see console log' });
    }
}

export const authenticate = (req, res) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ msg: "You're not Logged In" })
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid Token' })
        }
        req.user = decoded;
        return res.status(401).json({ msg: "You're Logged In with token " + token })
    })
}

export const createPetugas = (req, res) => {
    const nama_petugas = req.body.nama_petugas;
    const username = req.body.username;
    const password = req.body.pass;
    const telp = req.body.telp;
    const level = req.body.level;

    try {
        petugas.create({
            nama_petugas: nama_petugas,
            username: username,
            password: password,
            telp: telp,
            level: level
        })
        res.status(201).json({ msg: "Petugas Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePetugas = async (req, res) => {
    const isEmpty = await petugas.findOne({ where: { id: req.query.id } });
    if (!isEmpty) { console.log('Petugas Not Found'); return res.status(404).json({ msg: 'Petugas Not Found' }) };
    const { nama_petugas, username, telp, level } = req.body;
    try {
        await petugas.update({ nama_petugas: nama_petugas, username: username, telp: telp, level: level }, { where: { id: req.query.id } });
        res.status(200).json({ msg: 'Petugas Updated' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const deletePetugas = async (req, res) => {
    try {
        const data = await petugas.findOne({ where: { id: req.query.id } });
        if (!data) {
            console.error('Petugas Not Exist');
            return res.json('Petugas NOT Exist');
        }
        data.destroy();
        res.status(200).json({ msg: 'Petugas Deleted' });
    } catch (error) {
        console.error(error.message);
        return res.json({ msg: 'Error :(' })
    }
}