import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPetugas = () => {
    const [nama, setNama] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [telp, setTelp] = useState([]);
    const [level, setLevel] = useState([]);
    const navigate = useNavigate();

    const handleLevel = (e) => {
        setLevel(e.target.value);
    }

    const savePetugas = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_petugas', nama);
        formData.append('username', username);
        formData.append('pass', password);
        formData.append('telp', telp);
        formData.append('level', level);

        try {
            await axios.post('http://localhost:5000/petugas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/petugas');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="column is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={savePetugas}>
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
                        <label className="label">Password</label>
                        <div className="control">
                            <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                            <button type="submit" className="button is-success">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPetugas