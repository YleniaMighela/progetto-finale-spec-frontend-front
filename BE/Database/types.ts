export type Plant = {
    id?: number,
    title: string,                                 // nome della pianta 
    category: string,                              // categoria di appartenenza
    description: string,                           // descrizione della pianta
    image: string[],                                 // immagine
    light: string,                                 // tipo di esposizione
    water: string,                                 // frequenza di irrigazione
    temperature: string,                           // range ottimale
    difficulty: 'Facile' | 'Media' | 'Difficile',
    price: number,                                 // prezzo
};