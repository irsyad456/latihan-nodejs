import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import pengaduanRoute from "./routes/pengaduanRoute.js";
import tanggapanRoute from "./routes/tanggapanRoute.js";
import petugasRoute from "./routes/petugasRoute.js";
import masyarakatRoute from "./routes/masyarakatRoute.js";
import db from "./config/database.js";
import pengaduan from "./models/pengaduanModel.js";
import masyarakat from "./models/masyarakatModel.js";
import petugas from "./models/petugasModel.js";
import tanggapan from "./models/tanggapanModel.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({ methods: ['GET', 'POST', 'PATCH', 'DELETE'], credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(pengaduanRoute);
app.use(tanggapanRoute);
app.use(petugasRoute);
app.use(masyarakatRoute);


// Comment This Line After no synchronize
(
     async () => {
        try {
            await db.authenticate();
            await db.sync({ alter: true });
            console.log('Database Synchronized');
        } catch (error) {
            console.error('Database Error: ', error.message);
        }
    }
)();

app.listen(5000, () => console.log('Server Online...'));
