import { Sequelize } from "sequelize";
import db from "../config/database.js";
import pengaduan from "./pengaduanModel.js";

const {DataTypes} = Sequelize;

const masyarakat = db.define('masyarakat', {
    nik: {
        type: DataTypes.CHAR,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    telp: DataTypes.STRING
}, {
    freezeTableName: true
});

masyarakat.hasMany(pengaduan, { foreignKey: 'nik'});

export default masyarakat;

(async()=>{
    await db.sync();
})()