import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTanggapan = () => {
    const [tanggapan, setTanggapan] = useState([]);
    const [dropdownPengaduan, setDropdownPengaduan] = useState([]);
    const [selectedPengaduan, setSelectedPengaduan] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSelectedPengaduan = (e) => {
        setSelectedPengaduan(e.target.value);
    }

    const getPengaduanDropdown = async () => {
        try {
            const dropdown = await axios.get('http://localhost:5000/pengaduan/dropdown');
            setDropdownPengaduan(dropdown.data)
        } catch (error) {
            console.log('Error Fetching Dropdown :', error)
        }
    }


    const getTanggapanById = async () => {
        const response = await axios.get(`http://localhost:5000/tanggapan/${id}`);
        setTanggapan(response.data.tanggapan)
        setSelectedPengaduan(response.data.id_pengaduan)
    }

    const updateTanggapan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tanggapan', tanggapan);

        try {
            await axios.patch(`http://localhost:5000/tanggapan?id=${id}`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
            navigate('/tanggapan');
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getPengaduanDropdown();
        getTanggapanById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="column is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateTanggapan}>
                    <div className="field">
                        <label htmlFor="pengaduanDropdown" className="label">Pengaduan: </label>
                        <select id="pengaduanDropdown" onChange={handleSelectedPengaduan} value={selectedPengaduan}>
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
                            <button type="submit" className="button is-success">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTanggapan