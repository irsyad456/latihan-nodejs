import masyarakat from "../models/masyarakatModel.js";
import jwt, { decode }  from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getMasyarakat = async(req,res)=>{
    try {
        const response = await masyarakat.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createMasyarakat = async(req, res)=>{
    const nik = req.body.nik;
    const nama = req.body.nama;
    const username = req.body.username;
    const password = req.body.pass;
    const telp = req.body.telp;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await masyarakat.create({nik: nik, nama: nama, username: username, password: hashedPassword, telp: telp});
        res.status(201).json({msg: "Masyarakat Created"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "An error occurred" });
    }
}

export const loginMasyarakat = async(req,res)=>{
    const username = req.body.username;
    const password = req.body.pass;

    if(!username && !password) {
        return res.status(400).json({msg: "Username or password cannot null"});
    }

    try {
        const user = await masyarakat.findOne({ where: { username: username }});
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

    jwt.verify(token, 'your_secret_key', (err,decode) => {
        if(err) {
            return res.status(403).json({msg : 'Invalid Token'})
        }
        req.user = decode;
        return res.status(401).json({msg: "You're Logged In with token " + token})
    })
}