import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTanggapan = () => {
    const [tanggapan, setTanggapan] = useState([]);
    const [dropdownPengaduan, setDropdownPengaduan] = useState([]);
    const [selectedPengaduan, setSelectedPengaduan] = useState('');
    const navigate = useNavigate();

    const getPengaduanDropdown = async () => {
        try {
            const dropdown = await axios.get('http://localhost:5000/pengaduan/dropdown');
            setDropdownPengaduan(dropdown.data)
        } catch (error) {
            console.log('Error Fetching Dropdown :', error)
        }
    }

    const handleSelectedPengaduan = (e) => {
        setSelectedPengaduan(e.target.value);
    }

    const saveTanggapan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tanggapan', tanggapan);

        try {
            await axios.post(`http://localhost:5000/tanggapan?id=${selectedPengaduan}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/tanggapan');
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getPengaduanDropdown();
    }, []);

    return (
        <div className="column is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveTanggapan}>
                    <div className="field">
                        <label htmlFor="pengaduanDropdown" className="label">Pengaduan: </label>
                        <select id="pengaduanDropdown" onChange={handleSelectedPengaduan}>
                            <option value='' >Select Pengaduan</option>
                            {dropdownPengaduan.map((dropdown) =>
                                <option key={dropdown.id} value={dropdown.id}>
                                    {dropdown.isi_laporan}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Isi Tanggapan</label>
                        <div className="control">
                            <input type="text" className="input" value={tanggapan} onChange={(e) => setTanggapan(e.target.value)} />
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

export default AddTanggapan