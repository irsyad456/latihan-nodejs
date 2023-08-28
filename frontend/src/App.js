import { BrowserRouter, Routes, Route } from "react-router-dom";
import PengaduanList from "./components/PengaduanList";
import AddPengaduan from "./components/AddPengaduan";
import EditPengaduan from "./components/EditPengaduan";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PengaduanList />} />
        <Route path="login" element={<Login />} />
        <Route path="add" element={<AddPengaduan />} />
        <Route path="edit/:id" element={<EditPengaduan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
