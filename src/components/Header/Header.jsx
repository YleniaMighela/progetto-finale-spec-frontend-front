import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'


export default function Header() {

    return (
        <>
            <header>
                <Link to="/" className='title'> Scegli & Pianta
                    <FontAwesomeIcon icon={faSeedling} />
                </Link>
                <Navbar />
            </header >
        </>
    );
}