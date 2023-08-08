import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import pengaduanRoute from "./routes/pengaduanRoute.js";
import tanggapanRoute from "./routes/tanggapanRoute.js";
import petugasRoute from "./routes/petugasRoute.js";
import masyarakatRoute from "./routes/masyarakatRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(pengaduanRoute);
app.use(tanggapanRoute);
app.use(petugasRoute);
app.use(masyarakatRoute);

app.listen(5000, ()=> console.log('Server Online...'));