import masyarakat from "../models/masyarakatModel.js";
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) { console.log('token does not exist'); res.sendStatus(401) }
        const user = await masyarakat.findOne({ where: { refresh_token: refreshToken } })
        if (!user) return res.sendStatus(403)
        console.log(process.env.REFRESH_TOKEN_SECRET)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const nik = user.nik
            const nama = user.nama
            const username = user.username
            const accessToken = jwt.sign({ nik, nama, username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '60s'
            })
            res.json({ accessToken })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something Bad Happened' })
    }
}