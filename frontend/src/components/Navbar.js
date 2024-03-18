import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/masyarakat/logout')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    {/* <img src="" width="112" height="28" alt="web logo"/> */}
                    <h2 className=" title is-bold">Pengaduan Masyarakat</h2>
                </a>

                <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to='/dashboard' className="navbar-item">Home</Link>
                    <Link to='/masyarakat' className="navbar-item">Masyarakat</Link>
                    <Link to='/pengaduan' className="navbar-item">pengaduan</Link>
                    <Link to='/petugas' className="navbar-item">Petugas</Link>
                    <Link to='/tanggapan' className="navbar-item">Tanggapan</Link>

                    {/* <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {/* <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a> */}
                            {/* Tambahin Peringatan sebelum logout*/}
                            <button onClick={Logout} className="button is-danger is-light">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar