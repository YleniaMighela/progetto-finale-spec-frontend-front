import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './PlantComparator.css';

// importo i componentI
import PlantCompareSelector from '../../components/PlantCompareSelector/PlantCompareSelector';
import PlantCard from '../../components/PlantCard/PlantCard';


export default function PlantComparator() {
    const navigate = useNavigate();

    // stati che memorizzano gli ID delle piante selezionate dall'utente,inizialmente sono null e quindi mostrerà seleziona una pianta
    const [selectedPlantId1, setSelectedPlantId1] = useState(null);
    const [selectedPlantId2, setSelectedPlantId2] = useState(null);

    // stati che memorizzano i dati delle piante (titolo, descrizione, prezzo, ecc.)
    const [plant1Data, setPlant1Data] = useState(null);
    const [plant2Data, setPlant2Data] = useState(null);

    // stato che memorizza l'intera lista di tutte le piante disponibili, visibili nel dropwdown
    const [allPlants, setAllPlants] = useState([]);

    // Stati per gestire il caricamento dati
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // funzione che permette di caricare la lista dekle piante per popolare i dropdown 
    useEffect(() => {
        const fetchAllPlants = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3001/plants`);
                if (!response.ok) {
                    throw new Error(`Errore nel caricamento della lista di piante: ${response.statusText}`);
                }
                const data = await response.json();
                setAllPlants(data);
            } catch (e) {
                console.error("Errore nel caricamento di tutte le piante:", e);
                setError(`Errore nel caricamento delle piante: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPlants();
    }, []);


    // funzione che permette di caricare i dettagli delle piante selezionate 
    useEffect(() => {
        const fetchSelectedPlants = async () => {
            // Resetta i dati delle piante visualizzate e gli errori ogni volta che la selezione cambia.
            setPlant1Data(null);
            setPlant2Data(null);


            // Se uno dei due ID non è ancora stato selezionato, interrompi la funzione.
            if (!selectedPlantId1 || !selectedPlantId2) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Carica i dati della prima pianta usando l'ID selezionato.
                const response1 = await fetch(`http://localhost:3001/plants/${selectedPlantId1}`);
                const data1 = await response1.json();
                if (!response1.ok || !data1.plant) {
                    throw new Error(`Pianta con ID ${selectedPlantId1} non trovata.`);
                }
                setPlant1Data(data1.plant); // Salva i dati della prima pianta

                // Carica i dati della seconda pianta usando l'ID selezionato.
                // Questo avviene solo dopo che la prima richiesta è andata a buon fine.
                const response2 = await fetch(`http://localhost:3001/plants/${selectedPlantId2}`);
                const data2 = await response2.json();
                if (!response2.ok || !data2.plant) {
                    throw new Error(`Pianta con ID ${selectedPlantId2} non trovata.`);
                }
                setPlant2Data(data2.plant); // Salva i dati della seconda pianta

            } catch (e) {
                console.error("Errore nel fetch delle piante selezionate:", e);
                setError(`Errore nel caricamento: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchSelectedPlants();
    },
        // Dipendenze: questo effect si riesegue se uno degli ID cambia.
        [selectedPlantId1, selectedPlantId2]);

    if (loading && (allPlants.length === 0 || !plant1Data || !plant2Data)) return <div className='comparator_container'>Caricamento dati...</div>;
    if (error) return <div className='comparator_container error_message'><p>Errore: {error}</p></div>;

    return (
        <div className='comparator_page'>
            <button onClick={() => navigate("/")} className="button_back">⬅ Torna indietro</button>
            <h1>Confronta le tue piante</h1>

            {/* Contenitore per i due dropdown */}
            <div className="compare_selectors">

                {/* Primo selettore di piante (dropdown) */}
                <PlantCompareSelector
                    plants={allPlants}              // Passa la lista completa di piante al dropdown
                    selectedId={selectedPlantId1}   // Passa l'ID attualmente selezionato per il primo dropdown
                    onSelect={setSelectedPlantId1}  // Passa la funzione per aggiornare selectedPlantId1 quando l'utente sceglie
                />

                {/* Secondo selettore di piante (dropdown) */}
                <PlantCompareSelector
                    plants={allPlants}              // Passa la lista completa di piante al secondo dropdown
                    selectedId={selectedPlantId2}   // Passa l'ID attualmente selezionato per il secondo dropdown
                    onSelect={setSelectedPlantId2}  // Passa la funzione per aggiornare selectedPlantId2 quando l'utente sceglie

                />
            </div>

            {/* Visualizzazione delle schede delle piante, se entrambi sono ststa selezionate allora le mostro in pagina */}
            {plant1Data && plant2Data && (
                <div className='compare_card'>
                    <PlantCard plant={plant1Data} />
                    <PlantCard plant={plant2Data} />
                </div>
            )}

            {/* Messaggio per l'utente se non ha ancora selezionato entrambe le piante */}
            {!plant1Data || !plant2Data ? (
                <p className="status_message">Seleziona due piante dai menu a tendina per confrontarle.</p>
            ) : null}



            {/* Bottone per pulire le selezioni */}
            {(selectedPlantId1 || selectedPlantId2) && (
                <button
                    className="clear_button"
                    onClick={() => {
                        // Quando cliccato, queste funzioni resettano tutti gli stati di selezione e dati delle piante a null.
                        setSelectedPlantId1(null);
                        setPlant1Data(null);
                        setSelectedPlantId2(null);
                        setPlant2Data(null);
                        setError(null); // Resetta anche eventuali errori
                    }}

                >
                    Svuota Selezione
                </button>
            )}
        </div>
    );
}