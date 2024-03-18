import masyarakat from "../models/masyarakatModel.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { where } from "sequelize";

export const getMasyarakat = async (req, res) => {
    try {
        const response = await masyarakat.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMasyarakatByNIK = async (req, res) => {
    try {
        const response = await masyarakat.findOne({
            where: {
                nik: req.params.nik
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const createMasyarakat = async (req, res) => {
    const { nik, nama, username, pass, telp } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        await masyarakat.create({ nik: nik, nama: nama, username: username, password: hashedPassword, telp: telp });
        res.status(201).json({ msg: "Masyarakat Created" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred" });
    }
}

export const updateMasyarakat = async (req, res) => {
    const { nik, nama, username, telp } = req.body;

    if (nik == null || nama == null || username == null || telp == null) {
        console.log('Data is empty');
        return res.status(400).json({ msg: "The Data Can't be empty" });
    }

    try {
        const update = await masyarakat.findOne({ where: { nik: req.query.nik } });

        if (!update) {
            console.log('masyarakat not found');
            return res.status(404).json({ msg: 'Masyarakat Not Found' });
        }

        // Update the user's data
        await update.update({ nik: nik, nama: nama, username: username, telp: telp });
        res.json({ msg: 'Masyarakat Updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred :(' });
    }
};


export const loginMasyarakat = async (req, res) => {
    try {
        const user = await masyarakat.findOne({ where: { username: req.body.username } })
        if (!user) return res.status(401).json({ msg: 'Masyarakat Not found' })
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(401).json({ msg: 'Wrong Password!!!' })
        const nik = user.nik
        const nama = user.nama
        const username = user.username
        const accessToken = jwt.sign({ nik, nama, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
        const refreshToken = jwt.sign({ nik, nama, username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        await user.update({ refresh_token: refreshToken })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, maxAge: 24 * 60 * 60 * 1000,
            // secure: true
            // uncomment if using https
        })
        res.json({ accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error :(' })
    }
}

export const logoutMasyarakat = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await masyarakat.findOne({ where: { refresh_token: refreshToken } })
    if (!user) return res.sendStatus(204)
    await user.update({ refresh_token: null })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

export const deleteMasyarakat = async (req, res) => {
    try {
        await masyarakat.destroy({ where: { nik: req.query.nik } });
        res.status(200).json({ msg: 'Destroy Success' });
    } catch (error) {
        console.log(error.message);
    }
}