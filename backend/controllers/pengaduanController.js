import pengaduan from "../models/pengaduanModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

let date_time = new Date();

export const getPengaduan = async (req, res) => {
    try {
        const response = await pengaduan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPengaduanForDropdown = async (req, res) => {
    try {
        const data = await pengaduan.findAll({ attributes: ['id', 'isi_laporan'], where: { status: { [Op.ne]: 3 } } })
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: 'Something Happened' })
    }
}

export const getPengaduanById = async (req, res) => {
    try {
        const response = await pengaduan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePengaduan = async (req, res) => {
    try {
        if (req.files === null) return res.status(400).json({ msg: "Must Include Image" });
        // console.log(req.files.file);
        // return res.json(req.files);
        const tgl_pengaduan = date_time.getFullYear() + "-" +
            ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
            ("0" + (date_time.getDate())).slice(-2);
        const isi_laporan = req.body.laporan;
        const status = 2;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image Type" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image Size must less than 5MB" });

        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
                await pengaduan.create({
                    tgl_pengaduan: tgl_pengaduan, nik: req.query.nik,
                    isi_laporan: isi_laporan, foto: fileName, url: url, status: status
                })
                res.status(201).json({ msg: "Pengaduan Uploaded" });
            } catch (error) {
                console.log(error.message);
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ msg: 'Error' })
    }
}

export const updatePengaduan = async (req, res) => {
    const Pengaduan = await pengaduan.findOne({
        where: {
            id: req.params.id
        }
    });
    // console.log(req.files)
    // return res.json(req.files)
    if (!Pengaduan) return res.status(404).json({ msg: "Data Doesn't Exist" });
    let fileName = "";
    if (req.files === null) {
        fileName = Pengaduan.foto;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;

        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image Type" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image Size must less than 5MB" });

        const filePath = `./public/images/${Pengaduan.foto}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message }); console.log(err.message)
        })
    }
    const tgl_pengaduan = date_time.getFullYear() + "-" +
        ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
        ("0" + (date_time.getDate())).slice(-2);
    const isi_laporan = req.body.laporan;
    const status = 2;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Pengaduan.update({ tgl_pengaduan: tgl_pengaduan, isi_laporan: isi_laporan, foto: fileName, url: url, status: status }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Pengaduan Updated", url: fileName });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePengaduan = async (req, res) => {
    const Pengaduan = await pengaduan.findOne({
        where: {
            id: req.params.id
        }
    });
    // console.log(req.params);
    // return res.json(req.params.id)
    if (!Pengaduan) return res.status(404).json({ msg: "Data Doesn't Exist" })
    try {
        const filePath = `./public/images/${Pengaduan.foto}`;
        fs.unlinkSync(filePath);
        await pengaduan.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Pengaduan Deleted!" })
    } catch (error) {
        console.log(error.message);
    }
}