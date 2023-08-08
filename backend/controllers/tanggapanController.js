import tanggapan from "../models/tanggapanModel.js";

let date_time = new Date();

export const getTanggapan = async(req, res)=>{
    try {
        const response = await tanggapan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const getTanggapanById = async(req, res)=>{
    try {
        const response = await tanggapan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveTanggapan = (req,res)=>{
    const id_pengaduan = req.params.id;
    if(!id_pengaduan) return res.status(400).json({msg: "Pengaduan Doesn't Exist"});
    const tgl_tanggapan = date_time.getFullYear() + "-" + 
    ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
    ("0" + (date_time.getDate())).slice(-2);
    const Tanggapan = req.body.tanggapan;

    try {
        tanggapan.create({id_pengaduan: id_pengaduan, tgl_tanggapan: tgl_tanggapan, tanggapan: Tanggapan});
        res.status(201).json({msg: "Pengaduan Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTanggapan = (req, res)=>{
    
}

export const deleteTanggapan = (req, res)=>{
    
}