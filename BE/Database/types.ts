export type Plant = {
    id?: number,
    title: string,                                 // nome della pianta 
    category: string,                              // categoria di appartenenza
    description: string,                           // descrizione della pianta
    image: string[],                               //  array di immagini
    light: string,                                 // tipo di esposizione
    water: string,                                 // frequenza di irrigazione
    temperature: string,                           // range ottimale
    difficulty: 'Facile' | 'Media' | 'Difficile',  // literal type
    price: number,                                 // prezzo
};