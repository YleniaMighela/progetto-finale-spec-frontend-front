import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// importo il css
import './HomePage.css'
// importo i componenti
import Hero from '../../components/Hero/Hero'

export default function HomePage() {
    // stato per salvare le piante che recupero dal backend
    const [plants, setPlants] = useState([]);
    // stato per gestire il caricamento
    const [loading, setLoading] = useState(true);
    // stato per gestire eventuali errori
    const [error, setError] = useState(null);


    // funzione che permette di recuperare i dati dalle piante dal backend
    useEffect(() => {
        const fetchPlants = async () => {

            try {
                // chiamata che recupera tutte le piante, se la risposta non è andata a buon fine mostra un errore
                const response = await fetch('http://localhost:3001/plants');
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}. Dettagli: ${errorText}`);
                }
                // altrimenti converte la risposta in formato Json
                const data = await response.json();
                setPlants(data);

            } catch (err) {
                console.error("Errore nel caricamento delle piante:", err);
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchPlants();

    }, []);

    // Gestione degli stati di caricamento,errore o lista vuota

    if (loading) return <span>Caricamento piante...</span>;
    if (error) return <span>Errore nel caricamento delle piante: {error}</span>;

    if (!loading && !error && plants.length === 0) {
        return <span>Nessuna pianta trovata.</span>;
    }

    return (
        <>
            <div className='container_jumbo'>
                <img className='jumbo' src="../sfondo.jpg" alt="" />
            </div>


            <div className='container_plant'>
                <h1>Lista delle Piante</h1>

                <div className='container_record'>

                    {plants.map((plant) => (
                        <div className='record' key={plant.id}>
                            <h3 className='title_plant'>{plant.title}</h3>
                            {plant.image && plant.image.length > 0 && (
                                <img src={plant.image[0]} alt={plant.title}
                                    style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
                            )}
                            <p className='font_category'>Categoria: {plant.category}</p>
                            {/* Link per la pagina di dettaglio */}
                            <Link to={`/plants/${plant.id}`} className='button_detail'>Vedi dettagli</Link>
                        </div>
                    ))}

                </div>
            </div>
            <Hero />
        </>
    );
}

