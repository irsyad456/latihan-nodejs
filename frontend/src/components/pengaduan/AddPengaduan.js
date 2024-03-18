import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AddPengaduan = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [nik, setNik] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();

    const verifyMasyarakat = async () => {
        const response = await axios.get('http://localhost:5000/masyarakat-token')
        if (response.status === 403) {
            console.log("You're Not masyarakat")
            navigate('/dashboard')
        }
        const decoded = jwtDecode(response.data.accessToken)
        setNik(decoded.nik)
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    useEffect(() => {
        verifyMasyarakat();
    }, []);

    const savePengaduan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('laporan', title);

        try {
            await axios.post(`http://localhost:5000/pengaduan?nik=${nik}`, formData, {
                Headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
            navigate('/pengaduan');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='columns is-centered mt-5'>
            <div className='column is-half'>
                <form onSubmit={savePengaduan}>
                    <div className='field'>
                        <label className='label'>Isi Laporan</label>
                        <div className='control'>
                            <input
                                type="text"
                                className='input'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Isi Laporan'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Foto</label>
                        <div className='control'>
                            <div className='file'>
                                <label className='file-label'>
                                    <input type="file" className='file-input' onChange={loadImage} />
                                    <span className='file-cta'>
                                        <span className='file-label'>Masukkan Foto...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className='image is-128x128'>
                            <img src={preview} alt="Preview" />
                        </figure>
                    ) : ('')}

                    <div className='field'>
                        <div className='control'>
                            <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPengaduan