import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MasyarakatList = () => {
    const [masyarakat, setMasyarakat] = useState([]);

    useEffect(() => {
        getMasyarakat();
    }, []);

    const getMasyarakat = async () => {
        const response = await axios.get('http://localhost:5000/masyarakat');
        setMasyarakat(response.data);
    };

    const deleteMasyarakat = async (masyarakatId) => {
        try {
            await axios.delete(`http://localhost:5000/masyarakat?nik=${masyarakatId}`);
            getMasyarakat();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">

            <br />
            <Link to='/masyarakat/add' className="button is-success">Buat Masyarakat</Link>
            <div className="column is-multiline">
                {masyarakat.map((masyarakat) => (
                    <div className="column is-one-quarter" key={masyarakat.nik}>
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{masyarakat.nama}</p>
                                        <p className="title is-4">{masyarakat.nik}</p>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`/masyarakat/edit/${masyarakat.nik}`} className="card-footer-item">Edit</Link>
                                        <button onClick={() => deleteMasyarakat(masyarakat.nik)} className="card-footer-item">Delete</button>
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

export default MasyarakatList;