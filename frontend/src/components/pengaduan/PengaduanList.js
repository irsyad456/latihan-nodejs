import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PengaduanList = () => {
    const [pengaduan, setPengaduan] = useState([]);

    useEffect(() => {
        getPengaduan();
    }, []);
    
    const getPengaduan = async () => {
        const response = await axios.get('http://localhost:5000/pengaduan');
        setPengaduan(response.data);
    };

    const deletePengaduan = async (pengaduanId) => {
        try {
            await axios.delete(`http://localhost:5000/pengaduan/${pengaduanId}`);
            getPengaduan();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">

            <br />
            <Link to='/pengaduan/add' className='button is-success'> Buat Pengaduan</Link>
            <div className="columns is-multiline">
                {pengaduan.map((pengaduan) => (
                    <div className="column is-one-quarter" key={pengaduan.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="is-4by3">
                                    <img src={pengaduan.url} alt="Something" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{pengaduan.isi_laporan}</p>
                                        <p className="subtitle is-6">Status: {pengaduan.status}</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    {/* cari cara supaya 2 tombol dibawah
                                    hanya bisa dilihat oleh masyarakat sendiri pembuat laporan,
                                    dan petugas/admin */}
                                    <Link to={`edit/${pengaduan.id}`} className="card-footer-item">Edit</Link>
                                    <button onClick={() => deletePengaduan(pengaduan.id)} className="card-footer-item">Delete</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PengaduanList;
