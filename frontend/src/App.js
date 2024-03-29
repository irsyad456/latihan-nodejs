import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import MainLayout from "./MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route index element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />

              {/* Pengaduan */}
              <Route path="pengaduan" element={
                <Routes>
                  <Route index element={<PengaduanList />} />
                  <Route path="/edit/:id" element={<EditPengaduan />} />
                  <Route path="/add" element={<AddPengaduan />} />
                </Routes>
              } />

              {/* Masyarakat */}
              <Route path="masyarakat" element={
                <Routes>
                  <Route index element={<MasyarakatList />} />
                  <Route path="/edit/:id" element={<EditMasyarakat />} />
                  <Route path="/add" element={<AddMasyarakat />} />
                </Routes>
              } />

              {/* Petugas */}
              <Route path="petugas" element={
                <Routes>
                  <Route index element={<PetugasList />} />
                  <Route path="/edit/:id" element={<EditPetugas />} />
                  <Route path="/add" element={<AddPetugas />} />
                </Routes>
              } />

              {/* Tanggapan */}
              <Route path="tanggapan" element={
                <Routes>
                  <Route index element={<TanggapanList />} />
                  <Route path="/edit/:id" element={<EditTanggapan />} />
                  <Route path="/add" element={<AddTanggapan />} />
                </Routes>
              } />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
