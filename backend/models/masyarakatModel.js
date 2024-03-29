import { Sequelize } from "sequelize";
import bcrypt from 'bcryptjs'
import db from "../config/database.js";
import pengaduan from "./pengaduanModel.js";

const { DataTypes } = Sequelize;

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
    telp: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
}, {
    freezeTableName: true,
    hooks: {
        afterSync: async (model) => {
            if (model.sequelize.options.alter) {
                return;
            }

            await model.create({
                nik: '0972136969',
                nama: 'user',
                username: 'user',
                password: bcrypt.hash('password', 10),
                telp: '8098321'
            })
        }
    }
});

masyarakat.hasMany(pengaduan, { foreignKey: 'nik' });

export default masyarakat;