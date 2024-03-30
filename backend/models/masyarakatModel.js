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
        afterSync: async () => {
            if (await masyarakat.findByPk('0972136969', { attributes: ['nik'] })) {
                return;
            }

            try { 
                const saltRounds = 10;
                const password = await bcrypt.hash('password', saltRounds)
                await masyarakat.create({
                    nik: '0972136969',
                    nama: 'user',
                    username: 'user',
                    password: password,
                    telp: '8098321',
                });
                console.log('Record creation successful.');
            } catch (error) {
                console.error('Error creating record:', error);
            }
        }
    }
});

masyarakat.hasMany(pengaduan, { foreignKey: 'nik' });

export default masyarakat;
