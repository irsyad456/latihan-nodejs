import { BrowserRouter, Routes, Route } from "react-router-dom";
import PengaduanList from "./components/pengaduan/PengaduanList";
import AddPengaduan from "./components/pengaduan/AddPengaduan";
import EditPengaduan from "./components/pengaduan/EditPengaduan";
import Login from "./components/Login";
import MasyarakatList from "./components/masyarakat/MasyarakatList";
import AddMasyarakat from "./components/masyarakat/AddMasyarakat";
import EditMasyarakat from "./components/masyarakat/EditMasyarakat";
import PetugasList from "./components/petugas/PetugasList";
import AddPetugas from "./components/petugas/AddPetugas";
import Navbar from "./components/Navbar";
import EditPetugas from "./components/petugas/EditPetugas";
import TanggapanList from "./components/tanggapan/TanggapanList";
import AddTanggapan from "./components/tanggapan/AddTanggapan";
import EditTanggapan from "./components/tanggapan/EditTanggapan";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Pengaduan */}
        <Route path="/pengaduan" element={<PengaduanList />} />
        <Route path="/pengaduan/edit/:id" element={<EditPengaduan />} />
        <Route path="/pengaduan/add" element={<AddPengaduan />} />

        {/* Masyarakat */}
        <Route path="/masyarakat" element={<MasyarakatList />} />
        <Route path="/masyarakat/add" element={<AddMasyarakat />} />
        <Route path="/masyarakat/edit/:masyarakatNik" element={<EditMasyarakat />} />

        {/* Petugas */}
        <Route path="/petugas" element={<PetugasList />} />
        <Route path="/petugas/add" element={<AddPetugas />} />
        <Route path="/petugas/edit/:id" element={<EditPetugas />} />

        {/* Tanggapan */}
        <Route path="/tanggapan" element={<TanggapanList />} />
        <Route path="/tanggapan/add" element={<AddTanggapan />} />
        <Route path="/tanggapan/edit/:id" element={<EditTanggapan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
