import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPengaduan = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPengaduanById();
    }, []);

    const getPengaduanById = async () => {
        const response = await axios.get(`http://localhost:5000/pengaduan/${id}`);
        setTitle(response.data.isi_laporan)
        setFile(response.data.foto)
        setPreview(response.data.url)
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const updatePengaduan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('laporan', title);

        try {
            await axios.patch(`http://localhost:5000/pengaduan/${id}`, formData, {
                Headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='columns is-centered mt-5'>
            <div className='column is-half'>
                <form onSubmit={updatePengaduan}>
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
                            <button type='submit' className='button is-success'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPengaduan