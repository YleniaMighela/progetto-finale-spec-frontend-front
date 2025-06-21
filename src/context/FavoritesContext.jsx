import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

// componente che avvolerà l'intero main.jsx
export const FavoritesProvider = ({ children }) => {

    //  stato che contiene la lista dei preferiti
    const [favorites, setFavorites] = useState([]);


    // funzione che permette di aggiungere e rimuovere le piante dai preferiti
    const toggleFavorite = (plant) => {
        // funzione di aggiornamento setFavorites che riceve la funzione con l'elenco precedente
        setFavorites((prevFavorites) =>
            // se la pianta è già presente tra i prferiti
            prevFavorites.some((fav) => fav.id === plant.id)
                // la rimuove filtrandolo fuori
                ? prevFavorites.filter((fav) => fav.id !== plant.id)
                // altrimenti la aggiunge
                : [...prevFavorites, plant]
        );
    };


    // funzione che controlla se una pianta è gia presente tra i preferiti
    const isFavorite = (id) => {
        return favorites.some((fav) => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};


// hooks personalizzato per accedere al context
export const useFavorites = () => {
    return useContext(FavoritesContext);
};
