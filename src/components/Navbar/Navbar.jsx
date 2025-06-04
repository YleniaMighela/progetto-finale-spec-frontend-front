import { Link } from "react-router-dom";
import './Navbar.css'
export default function Navbar() {


    return (
        <>
            <div className="navbar">
                <Link to="/" className="link">Home</Link>
                <Link to="/compare" className="link">Confronta le piante</Link>
                <Link to="/favorites" className="link">Lista dei desideri</Link>

            </div>
        </>
    );
}