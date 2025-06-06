import './Footer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";



export default function Footer() {

    return (
        <footer>
            <div className="footer-left">
                <span>Termini e condizioni</span>
                <span className="footer-none">Contatti  +39 3424395784</span>
                <span className="footer-none">email@outlook.it</span>
                <span className="footer-none">P.IVA 56546841354864</span>
            </div>
            <div className="footer-right">
                <span>Seguici anche su</span>
                <span><FontAwesomeIcon icon={faInstagram} size="2x" color="#E1306C" /></span>
                <span><FontAwesomeIcon icon={faFacebook} size="2x" color="#1877F2" /></span>
                <span><FontAwesomeIcon icon={faWhatsapp} size="2x" color="#25D366" /></span>
            </div>
        </footer>

    )
}

