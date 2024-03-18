import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMasyarakat = () => {
    const [nik, setNik] = useState([]);
    const [nama, setNama] = useState([]);
    const [username, setUsername] = useState([]);
    const [telp, setTelp] = useState([]);
    const { masyarakatNik } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMasyarakatByNIK();
    }, []);

    const getMasyarakatByNIK = async () => {
        const response = await axios.get(`http://localhost:5000/masyarakat/${masyarakatNik}`);
        setNik(response.data.nik);
        setNama(response.data.nama);
        setUsername(response.data.username);
        setTelp(response.data.telp);
    }

    const updateMasyarakat = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nik', nik);
        formData.append('nama', nama);
        formData.append('username', username);
        formData.append('telp', telp);

        try {
            await axios.patch(`http://localhost:5000/masyarakat?nik=${masyarakatNik}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/masyarakat');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateMasyarakat}>
                    <div className="field">
                        <label className="label">NIK</label>
                        <div className="control">
                            <input className="input" type="type" value={nik} onChange={(e) => setNik(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input className="input" type="type" value={nama} onChange={(e) => setNama(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input" type="type" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Telp</label>
                        <div className="control">
                            <input className="input" type="type" value={telp} onChange={(e) => setTelp(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMasyarakat;