import { Sequelize } from "sequelize";
import db from "../config/database.js";
import pengaduan from "./pengaduanModel.js";

const {DataTypes} = Sequelize;

const tanggapan = db.define('tanggapan', {
    id_pengaduan: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER,
    tgl_tanggapan: DataTypes.DATEONLY,
    tanggapan: DataTypes.TEXT
}, {
    freezeTableName: true
});

tanggapan.belongsTo(pengaduan, { foreignKey: 'id_pengaduan'})

export default tanggapan;

(async()=>{
    await db.sync();
})()