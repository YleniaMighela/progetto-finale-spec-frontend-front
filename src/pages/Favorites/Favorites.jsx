import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import './Favorites.css';

export default function FavoritesPage() {
    // hook che serve per navigare tra le pagine
    const navigate = useNavigate();

    // destrutto l'oggetto dal context
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // se la lista de preferiti è vuota mostra un messaggio 
    if (favorites.length === 0) {
        return (
            <div className="empty_favorites_message">
                <p>Nessuna pianta nei preferiti ♡.</p>
                <button onClick={() => navigate("/")} className="button_back">⬅ Torna indietro</button>
            </div>
        )
    }

    // se ci sono preferiti mostra la lista
    return (
        <div className='container_favorites'>

            {/* pulsante per tornare alla home */}
            <button onClick={() => navigate("/")} className="button_back">⬅ Torna indietro</button>

            <h1>Le tue Piante Preferite</h1>

            {/* contenitore delle piante aggiunte tra i preferiti */}
            <div className='container_record'>
                {favorites.map((plant) => (
                    <div className='record' key={plant.id}>


                        {/* bottone per togliere/mettere "like" */}
                        <div className="button_like">
                            <button onClick={() => toggleFavorite(plant)} className="button_fav">
                                {/* se  l'id della pianta è presente tra i preferiti allora è true e applica il colore arancione */}
                                {isFavorite(plant.id) ? (
                                    <span className="heart_filled">♥</span>
                                ) : (
                                    // altrimenti è falso e applica il colore verde
                                    <span className="heart_empty">♡</span>
                                )}
                            </button>
                        </div>


                        <h3 className='title_plant'>{plant.title}</h3>
                        {plant.image && plant.image.length > 0 && (
                            <img
                                src={plant.image[0]}
                                alt={plant.title}
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        )}
                        <p className='font_category'>Categoria: {plant.category}</p>

                        {/* link di dettaglio */}
                        <Link to={`/plants/${plant.id}`} className='button_detail'>
                            Vedi dettagli
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}
