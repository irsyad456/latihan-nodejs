import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const pengaduan = db.define('pengaduan', {
    tgl_pengaduan: DataTypes.DATEONLY,
    nik: DataTypes.CHAR,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    status: DataTypes.ENUM('0', 'proses', 'selesai')
}, {
    freezeTableName: true
});


export default pengaduan;

(async()=>{
    await db.sync();
})()