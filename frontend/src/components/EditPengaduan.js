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
        <div class='columns is-centered mt-5'>
            <div class='column is-half'>
                <form onSubmit={updatePengaduan}>
                    <div class='field'>
                        <label class='label'>Isi Laporan</label>
                        <div class='control'>
                            <input
                                type="text"
                                class='input'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Isi Laporan'
                            />
                        </div>
                    </div>
                    <div class='field'>
                        <label class='label'>Foto</label>
                        <div class='control'>
                            <div class='file'>
                                <label class='file-label'>
                                    <input type="file" class='file-input' onChange={loadImage} />
                                    <span class='file-cta'>
                                        <span class='file-label'>Masukkan Foto...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure class='image is-128x128'>
                            <img src={preview} alt="Preview" />
                        </figure>
                    ) : ('')}

                    <div class='field'>
                        <div class='control'>
                            <button type='submit' class='button is-success'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPengaduan