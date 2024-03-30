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
        <Route index element={<Login />} />

        <Route path="dashboard" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Masyarakat */}
        <Route path="masyarakat" element={<MainLayout />}>
          <Route index element={<MasyarakatList />} />
          <Route path="edit/:masyarakatNik" element={<EditMasyarakat />} />
          <Route path="add" element={<AddMasyarakat />} />
        </Route>

        {/* Pengaduan */}
        <Route path="pengaduan" element={<MainLayout />}>
          <Route index element={<PengaduanList />} />
          <Route path="edit/:id" element={<EditPengaduan />} />
          <Route path="add" element={<AddPengaduan />} />
        </Route>

        {/* Petugas */}
        <Route path="petugas" element={<MainLayout />}>
          <Route index element={<PetugasList />} />
          <Route path="edit/:id" element={<EditPetugas />} />
          <Route path="add" element={<AddPetugas />} />
        </Route>

        {/* Tanggapan */}
        <Route path="tanggapan" element={<MainLayout />}>
          <Route index element={<TanggapanList />} />
          <Route path="edit/:id" element={<EditTanggapan />} />
          <Route path="add" element={<AddTanggapan />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
