import petugas from "../models/petugasModel.js";
import jwt from "jsonwebtoken";

export const loginPetugas = async(req, res)=>{
    const username = req.body.username;
    const password = req.body.pass;

    if(!username && !password) {
        return res.status(400).json({msg: "Username or password cannot null"});
    }

    try {
        const user = await petugas.findOne({ where: { username: username }});
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user && !passwordMatch) {
            return res.status(401).json({msg: "Invalid Username Or Password"});
        }

        const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({success: true, token, msg: "Please save The token For Authenticate" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Some Error Occured, Please see console log' });
    }
}

export const authenticate = (req,res)=>{
    const token = req.header('token');

    if(!token) {
        return res.status(401).json({msg: "You're not Logged In"})
    }

    jwt.verify(token, 'your_secret_key', (err,decoded) => {
        if(err) {
            return res.status(403).json({msg : 'Invalid Token'})
        }
        req.user = decoded;
        return res.status(401).json({msg: "You're Logged In with token " + token})
    })
}

export const createPetugas = (req, res)=>{
    const nama_petugas = req.body.nama;
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
        res.status(201).json({msg: "Petugas Created"});
    } catch (error) {
        console.log(error.message);
    }
}