import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPengaduan = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const savePengaduan = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('laporan', title);

        try {
            await axios.post('http://localhost:5000/pengaduan', formData, {
                Headers:{
                    'Content-type' : 'multipart/form-data'
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
                <form onSubmit={savePengaduan}>
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
                                    <input type="file" class='file-input' onChange={loadImage}/>
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
                            <button type='submit' class='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPengaduan