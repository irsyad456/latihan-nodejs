import React, { useState, useEffect } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import navigate, { Link } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [pengaduan, setPengaduan] = useState('');
  const [expire, setExpire] = useState('');
  const [token, setToken] = useState('');

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/masyarakat-token')
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.nama)
      setExpire(decoded.exp)
    } catch (error) {
      console.log(error)
    }
  }

  const getPengaduan = async () => {
    const data = await axios.get('http://localhost:5000/pengaduan')
    setPengaduan(data.data)
  }

  useEffect(() => {
    refreshToken();
    getPengaduan();
  }, []);

  return (
    <div className="container">
      <section className="section">
        <h1 className="title">Welcome : {name}</h1>
        <h2 className="subtitle">To Website Pengaduan Masyarakat</h2>
      </section>
      <div className="buttons">
        <Link to='/pengaduan/add' className="button is-primary is-light">Buat Pengaduan</Link>
      </div>
      <table className="table is-bordered is-striped is-narrow is-fullwidth">
        <thead className="has-background-primary">
          <tr >
            <th >No</th>
            <th className="has-text-centered">Foto</th>
            <th className="has-text-centered">Isi Pengaduan</th>
            <th className="has-text-centered">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(pengaduan) ? (
            pengaduan.map((pengaduan, index) => (
              <tr key={pengaduan.id}>
                {/* Cari cara supaya data pengaduan hanya milik masyarakat yang boleh ditampilin */}
                <td>{index + 1}</td>
                <td><center><img src={pengaduan.url} width="200" height="200" alt="Bukti Pengaduan" /></center></td>
                <td>{pengaduan.isi_laporan}</td>
                <td><center>
                  {(() => {
                    switch (pengaduan.status) {
                      case '0':
                        return <span className="tag is-danger">Belum Diproses</span>;
                      case 'proses':
                        return <span className="tag is-warning">Proses</span>;
                      case 'selesai':
                        return <span className="tag is-success">Selesai</span>;
                      default:
                        return pengaduan.status;
                    }
                  })()}
                </center></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">You Have <b>0</b> Pengaduan</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
