import { Link } from "react-router-dom";
import './Navbar.css'
import SearchBar from "../SearchBar/SearchBar";
export default function Navbar() {


    return (
        <>

            <SearchBar />
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/compare">Confronta le piante</Link>
                <Link to="/favorites">Lista dei desideri</Link>

            </div>
        </>
    );
}