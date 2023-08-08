import pengaduan from "../models/pengaduanModel.js";
import path from "path";
import fs from "fs";

let date_time = new Date();

export const getPengaduan = async(req, res)=>{
    try {
        const response = await pengaduan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPengaduanById = async(req, res)=>{
    try {
        const response = await pengaduan.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePengaduan = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "Must Include Image"});
    const tgl_pengaduan = date_time.getFullYear() + "-" + 
    ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
    ("0" + (date_time.getDate())).slice(-2);
    const isi_laporan = req.body.laporan;
    const status = 2;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image Type"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image Size must less than 5MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await pengaduan.create({tgl_pengaduan: tgl_pengaduan, isi_laporan: isi_laporan, foto: fileName, status: status})
            res.status(201).json({msg: "Pengaduan Uploaded"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updatePengaduan = async(req, res)=>{
    const Pengaduan = await pengaduan.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!Pengaduan) return res.status(404).json({msg: "Data Doesn't Exist"});
    let fileName = "";
    if(req.files === null){
        fileName = Pengaduan.foto;
    } else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image Type"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image Size must less than 5MB"});

        const filePath = `./public/images/${Pengaduan.foto}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        })
    }
    const tgl_pengaduan = date_time.getFullYear() + "-" + 
    ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
    ("0" + (date_time.getDate())).slice(-2);
    const isi_laporan = req.body.laporan;
    const status = 2;
    try {
        await Pengaduan.update({tgl_pengaduan: tgl_pengaduan, isi_laporan: isi_laporan, foto: fileName, status: status}, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pengaduan Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePengaduan = async(req, res)=>{
    const Pengaduan = await pengaduan.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!Pengaduan) return res.status(404).json({msg: "Data Doesn't Exist"})
    try {
        const filePath = `./public/images/${Pengaduan.foto}`;
        fs.unlinkSync(filePath);
        await pengaduan.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Pengaduan Deleted!"})
    } catch (error) {
        console.log(error.message);
    }
}