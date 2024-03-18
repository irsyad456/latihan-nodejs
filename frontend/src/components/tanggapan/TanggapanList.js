import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TanggapanList = () => {
    const [tanggapan, setTanggapan] = useState([]);

    useEffect(() => {
        getTanggapan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTanggapan = async () => {
        const response = await axios.get('http://localhost:5000/tanggapan');
        setTanggapan(response.data);
    }

    const deleteTanggapan = async (tanggapanId) => {
        try {
            await axios.delete(`http://localhost:5000/tanggapan/${tanggapanId}`);
            getTanggapan();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">

            <br />
            <Link to='/tanggapan/add' className="button is-success"> Buat Tanggapan</Link>
            <div className="columns is-multiline">
                {tanggapan.map((tanggapan) => (
                    <div className="column is-one-quarter" key={tanggapan.id}>
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                    Pengaduan: {tanggapan.pengaduan.isi_laporan}
                                    <br />
                                    Tanggal Pengaduan: {tanggapan.pengaduan.tgl_pengaduan}
                                </p>
                            </header>
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={tanggapan.pengaduan.url} alt="Pengaduan" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">
                                            Tanggapan: {tanggapan.tanggapan}
                                            <br />
                                            Tgl Tanggapan: {tanggapan.tgl_tanggapan}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link to={`/tanggapan/edit/${tanggapan.id}`} className="card-footer-item">Edit</Link>
                                <button onClick={() => deleteTanggapan(tanggapan.id)} className="card-footer-item">Delete</button>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TanggapanList