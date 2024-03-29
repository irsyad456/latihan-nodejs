import { Sequelize } from "sequelize";
import db from "../config/database.js";
import tanggapan from "./tanggapanModel.js"

const { DataTypes } = Sequelize;

const pengaduan = db.define('pengaduan', {
    tgl_pengaduan: DataTypes.DATEONLY,
    nik: DataTypes.CHAR,
    isi_laporan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.ENUM('0', 'proses', 'selesai')
}, {
    freezeTableName: true
});

pengaduan.hasMany(tanggapan, { foreignKey: 'id_pengaduan' })
tanggapan.belongsTo(pengaduan, { foreignKey: 'id_pengaduan' })

export default pengaduan;
