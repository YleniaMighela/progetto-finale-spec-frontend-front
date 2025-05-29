import { useState } from 'react';
import './SearchBar.css'

export default function SearchBar() {
    // stato per la ricerca
    const [search, setSearch] = useState('');

    return (
        <>
            <div className='searchbar'>
                <input type="text"
                    placeholder='Cerca la tua piantina...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </>


    )

}