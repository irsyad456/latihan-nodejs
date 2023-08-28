import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

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
        <div class="container">
            <Link to='/add' class='button is-success'> Buat Pengaduan</Link>
            <div class="columns is-multiline">
                {pengaduan.map((pengaduan) => (
                    <div class="column is-one-quarter" key={pengaduan.id}>
                        <div class="card">
                            <div class="card-image">
                                <figure class="is-4by3">
                                    <img src={pengaduan.url} alt="Something" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4">{pengaduan.isi_laporan}</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <Link to={`edit/${pengaduan.id}`} class="card-footer-item">Edit</Link>
                                    <button onClick={() => deletePengaduan(pengaduan.id)} class="card-footer-item">Delete</button>
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