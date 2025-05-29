import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../Navbar/Navbar'


export default function Header() {

    return (
        <header>
            <h1 className='title'> Scegli & Pianta
                <FontAwesomeIcon icon={faSeedling} />
            </h1>
            <Navbar />
        </header>
    );
}