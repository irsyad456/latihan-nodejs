import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPetugas = () => {
    const [nama, setNama] = useState([]);
    const [username, setUsername] = useState([]);
    const [telp, setTelp] = useState([]);
    const [level, setLevel] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    const handleLevel = (e) => {
        setLevel(e.target.value);
    }

    const getPetugasById = async () => {
        const response = await axios.get(`http://localhost:5000/petugas/${id}`);
        setNama(response.data.nama_petugas)
        setUsername(response.data.username)
        setTelp(response.data.telp)
        setLevel(response.data.level)
    }

    const updatePetugas = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_petugas', nama);
        formData.append('username', username);
        formData.append('telp', telp);
        formData.append('level', level);

        try {
            await axios.patch(`http://localhost:5000/petugas?id=${id}`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
            navigate('/petugas');
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPetugasById();
    }, []);

    return (
        <div className="column is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={(e) => updatePetugas(e)}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input type="text" className="input" value={nama} onChange={(e) => setNama(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Telp</label>
                        <div className="control">
                            <input type="text" className="input" value={telp} onChange={(e) => setTelp(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label>">Role</label>
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name="level" value='admin' checked={level === 'admin'} onChange={handleLevel} />
                                Admin
                            </label>
                            <label className="radio">
                                <input type="radio" name="level" value='petugas' checked={level === 'petugas'} onChange={handleLevel} />
                                Petugas
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPetugas