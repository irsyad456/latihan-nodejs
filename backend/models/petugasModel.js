import { Sequelize } from "sequelize";
import db from "../config/database.js";
import tanggapan from "./tanggapanModel.js";

const { DataTypes } = Sequelize;

const petugas = db.define('petugas', {
    nama_petugas: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
    level: DataTypes.ENUM('admin', 'petugas')
}, {
    freezeTableName: true
})

petugas.hasMany(tanggapan, { foreignKey: 'id_petugas' })

export default petugas;