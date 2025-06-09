
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faDroplet, faEuroSign, faHandHoldingHeart, faTemperatureEmpty, faLeaf } from "@fortawesome/free-solid-svg-icons";
import './PlantCard.css';

// Il componente PlantCard riceve un oggetto plant come prop
export default function PlantCard({ plant }) {
    // Se 'plant' non è definito, puoi renderizzare un messaggio vuoto o un errore
    if (!plant) {
        return <div>Nessuna pianta selezionata.</div>;
    }

    return (
        <div className='plant_card'>
            <h2 className='title_plant'>{plant.title}</h2>
            {plant.image && plant.image.length > 0 && (
                <img src={plant.image[0]} alt={plant.title} className='plant_image' />
            )}
            <p className='font_category'>Categoria: {plant.category}</p>
            <div className='container_description'>
                <p><FontAwesomeIcon icon={faLeaf} className='description' /><strong> Descrizione: </strong>{plant.description}</p>
                <p><FontAwesomeIcon icon={faSun} className='sun' /><strong> Esposizione: </strong> {plant.light}</p>
                <p><FontAwesomeIcon icon={faDroplet} className='water' /><strong> Annaffiatura: </strong>{plant.water}</p>
                <p><FontAwesomeIcon icon={faTemperatureEmpty} className='temperature' /><strong> Temperatura: </strong>{plant.temperature}</p>
                <p><FontAwesomeIcon icon={faHandHoldingHeart} className='difficulty' /><strong> Difficoltà: </strong>{plant.difficulty}</p>
                <p><FontAwesomeIcon icon={faEuroSign} className='price' /><strong> Prezzo: </strong>{plant.price}€ </p>
            </div>
        </div>
    );
}