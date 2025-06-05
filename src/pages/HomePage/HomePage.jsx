import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
// importo il css
import './HomePage.css'
// importo i componenti
import Hero from '../../components/Hero/Hero'
import SearchBar from '../../components/SearchBar/SearchBar';

export default function HomePage() {
    // stato per salvare le piante che recupero dal backend
    const [plants, setPlants] = useState([]);
    // stato per gestire il caricamento
    const [loading, setLoading] = useState(true);
    // stato per gestire eventuali errori
    const [error, setError] = useState(null);
    // stato per gestire il valore che viene inserito nella barra di ricerca
    const [search, setSearch] = useState('');
    // stato per gestire la ricerca per cagetoria
    const [category, setCategory] = useState('');
    // stato per gestire l'ordinamento alfabetico
    const [sortBy, setSortBy] = useState('')

    const { favorites, toggleFavorite, isFavorite } = useFavorites();

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

    // funzione per aggiornare la ricerca in base al testo inserito
    const handleSearch = (title) => {
        setSearch(title)
    };


    // funzione per la gestione delle categorie
    const handleCategory = (e) => {
        setCategory(e.target.value)
    };

    // funzione per la gestionde dell'ordinamento
    const handleSort = (e) => {
        setSortBy(e.target.value)
    };



    // filtro le piante che includono il titolo che viene inserito nel campo di ricerca
    const filterAndCategoryPlant = plants.filter(plant => {
        const searchTitle = plant.title.toLowerCase().includes(search.toLowerCase());
        const selectCategory = category === '' || category === 'Seleziona' || plant.category.toLowerCase() === category.toLowerCase();
        // se entrambte sono true restituidvi titolo e catgorie nell'array filterAndCategoryPlant
        return searchTitle && selectCategory;


    })

    // ordino le piante filtrate, prendo tutto quello che è presente nell'arrai filtrato e ne credo una copia con lo spread
    const sortPlants = [...filterAndCategoryPlant].sort((a, b) => {
        // l'ordinamento per il titolo è ascendente cioè a-z 
        if (sortBy === 'ascendente') {
            return a.title.localeCompare(b.title)
        }
        // l'ordinamento per il titolo è discendente cioè z-a 
        else if (sortBy === 'discendente') {
            return b.title.localeCompare(a.title);
        }
        //  l'ordinamento per la categoria è ascendente cioè a-z 
        else if (sortBy === 'categoryasc') {
            return a.category.localeCompare(b.category);
        }
        // l'ordinamento per la categoria è discendente cioè z-a 
        else if (sortBy === 'categorydisc') {
            return b.category.localeCompare(a.category);
        }
    })

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
                <div className='container_search'>
                    {/* barra di ricerca */}
                    <SearchBar search={search} setSearch={handleSearch} />

                    {/* selettore per categorie */}
                    <div className='container_category'>
                        <label> Categorie</label>
                        <select
                            value={category}
                            onChange={handleCategory}
                        >
                            <option value="">Seleziona</option>
                            <option value="Arbustate">Arbustate</option>
                            <option value="Cactacea">Cactacea</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Rosetta">Rosetta</option>
                        </select>
                    </div>
                    {/* selettore ordinamento alfabetico */}

                    <div className='container_sort' >
                        <label >Ordina:</label>
                        <select
                            value={sortBy}
                            onChange={handleSort}
                        >
                            <option value="">Default</option>
                            <option value="ascendente"> Nome dalla A alla Z</option>
                            <option value="discendente">Nome dalla Z alla A</option>
                            <option value="categoryasc">Categoria dalla A alla A</option>
                            <option value="categorydisc">Categoria dalla Z alla A</option>

                        </select>
                    </div>

                </div>

                <div className='container_record'>
                    {/* se l'array della piante filtrate è vuoto mostro un messaggio */}
                    {sortPlants.length === 0 ? (
                        <div>
                            Nessuna pianta trovata
                            {search && ` per la ricerca "${search}"`}
                            {category && category !== '' && ` nella categoria "${category}"`}
                            .
                        </div>
                    ) : (
                        // altrimenti mostro i dati appartenenti alla relatva ricerca
                        sortPlants.map((plant) => (
                            <div className='record' key={plant.id}>
                                {/* sezione preferiti */}
                                <div className="button_like">
                                    <button onClick={() => toggleFavorite(plant)} className="button_fav">
                                        {isFavorite(plant.id) ? (
                                            <span className="heart_filled">♥</span>
                                        ) : (
                                            <span className="heart_empty">♡</span>
                                        )}
                                    </button>
                                </div>
                                {/* sezione immagine */}
                                <div className='container_image'>
                                    <h3 className='title_plant'>{plant.title}</h3>
                                    <p className='font_category'>Categoria: {plant.category}</p>

                                    {/* link per la pagina di dettaglio */}

                                    <Link to={`/plants/${plant.id}`} className='button_detail'>Vedi dettagli</Link>

                                </div>

                            </div>
                        ))
                    )}
                </div>

            </div>
            <Hero />
        </>
    );
}

