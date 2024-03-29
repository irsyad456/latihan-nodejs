import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function MainLayout({ children }) {
    const location = useLocation()

    return (
        <>
            {location.pathname !== '/' && <Navbar />}
            {children}
        </>
    )
}

export default MainLayout