import pengaduan from "../models/pengaduanModel.js";
import tanggapan from "../models/tanggapanModel.js";

let date_time = new Date();

export const getTanggapan = async (req, res) => {
    try {
        const response = await tanggapan.findAll({ include: [pengaduan] });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const getTanggapanById = async (req, res) => {
    try {
        const response = await tanggapan.findOne({
            where: {
                id: req.params.id
            },
            include: [pengaduan]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveTanggapan = async (req, res) => {
    const Pengaduan = await pengaduan.findOne({ where: { id: req.query.id } })
    if (!Pengaduan) return res.status(400).json({ msg: "Pengaduan Doesn't Exist" });
    if (Pengaduan.status == 'selesai') return res.status(204).json({ msg: 'Pengaduan Already Resolved' })
    const tgl_tanggapan = date_time.getFullYear() + "-" +
        ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" +
        ("0" + (date_time.getDate())).slice(-2);
    try {
        await tanggapan.create({ id_pengaduan: req.query.id, tgl_tanggapan: tgl_tanggapan, tanggapan: req.body.tanggapan });
        Pengaduan.update({ status: 3 });
        res.status(201).json({ msg: "Tanggapan Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTanggapan = async (req, res) => {
    console.log(req.body)
    const isExist = await tanggapan.findOne({ where: { id: req.query.id } });
    if (!isExist) { console.log('tanggapan not exist'); return res.status(400).json({ msg: 'tanggapan not exist' }) };
    const tgl_tanggapan = date_time.getFullYear() + "-" + ('0' + (date_time.getMonth() + 1)).slice(-2) + "-" + ('0' + (date_time.getDate())).slice(-2);
    try {
        await tanggapan.update({ tanggapan: req.body.tanggapan, tgl_tanggapan: tgl_tanggapan }, { where: { id: req.query.id } })
        res.status(200).json({ msg: 'Tanggapan Updated' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const deleteTanggapan = async (req, res) => {
    try {
        const data = await tanggapan.findOne({ where: { id: req.params.id } });
        if (!data) { console.log('Tanggapan NOT Found'); res.status(404).json({ msg: 'Tanggapan Not Found' }) };
        await pengaduan.update({ status: 2 }, { where: { id: data.id_pengaduan } });
        data.destroy();

        res.status(200).json({ msd: 'Tanggapan Deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}