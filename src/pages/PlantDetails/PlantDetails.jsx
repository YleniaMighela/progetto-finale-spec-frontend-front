import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// importo il css
import './PlantDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faDroplet, faEuroSign, faHandHoldingHeart, faTemperatureEmpty, faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function PlantDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlant = async () => {
            if (!id) {
                setLoading(false);
                setError("ID pianta non fornito nell'URL.");
                return;
            }
            try {
                const response = await fetch(`http://localhost:3001/plants/${id}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Errore sconosciuto' }));
                    throw new Error(`HTTP error! status: ${response.status}. Messaggio: ${errorData.message || 'Errore generico.'}`);
                }
                const data = await response.json();


                if (data && data.plant) {
                    setPlant(data.plant);
                } else {
                    throw new Error("Dati pianta non trovati nella risposta del server.");
                }

            } catch (e) {
                console.error("Errore nel fetch della pianta:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlant();
    }, [id]);

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error}</div>;
    if (!plant) return <div>Nessuna pianta trovata o errore di caricamento.</div>;

    return (
        <div className='container_detail'>
            <button onClick={() => navigate("/")} className="button_back">⬅ Torna indietro</button>
            <h1 className='title_plant'>{plant.title}</h1>
            <p className='font_category'>Categoria: {plant.category}</p>

            <div className='detail'>
                {plant.image && plant.image.map((imgPath, index) => (
                    <img
                        key={index}
                        src={imgPath}
                        alt={plant.title}

                    />
                ))}

                <div className='container_description' >
                    <p><FontAwesomeIcon icon={faLeaf} className='description' /><strong> Descrizione: </strong>{plant.description}</p>
                    <p><FontAwesomeIcon icon={faSun} className='sun' /><strong> Esposizione: </strong>  {plant.light}</p>
                    <p><FontAwesomeIcon icon={faDroplet} className='water' /><strong> Annaffiatura: </strong> {plant.water}</p>
                    <p><FontAwesomeIcon icon={faTemperatureEmpty} className='temperature' /><strong> Temperatura: </strong>{plant.temperature}</p>
                    <p><FontAwesomeIcon icon={faHandHoldingHeart} className='difficulty' /><strong> Difficoltà: </strong>{plant.difficulty}</p>
                    <p><FontAwesomeIcon icon={faEuroSign} className='price' /><strong> Prezzo: </strong>{plant.price}€ </p>
                </div>
            </div>

        </div>
    );
}

