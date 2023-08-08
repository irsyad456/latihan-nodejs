import petugas from "../models/petugasModel.js";

export const login = (req, res)=>{
    
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