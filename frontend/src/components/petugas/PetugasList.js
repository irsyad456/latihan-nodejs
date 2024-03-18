import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PetugasList = () => {
    const [petugas, setPetugas] = useState([]);

    useEffect(() => {
        getPetugas();
    }, []);

    const getPetugas = async () => {
        const response = await axios.get('http://localhost:5000/petugas');
        setPetugas(response.data);
    };

    const deletePetugas = async (petugasId) => {
        try {
            await axios.delete(`http://localhost:5000/petugas?id=${petugasId}`);
            getPetugas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">

            <br />
            <Link to='/petugas/add' className="button is-success">Buat Petugas</Link>
            <div className="column is-multiline">
                {petugas.map((petugas) => (
                    <div className="column is-one-quarter" key={petugas.id}>
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{petugas.nama_petugas}</p>
                                        <p className="title is-5 mt-0">Role: {petugas.level}</p>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`/petugas/edit/${petugas.id}`} className="card-footer-item">Edit</Link>
                                        <button onClick={() => deletePetugas(petugas.id)} className="card-footer-item">Delete</button>
                                    </footer>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default PetugasList;