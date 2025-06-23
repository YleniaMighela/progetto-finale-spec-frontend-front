import './SearchBar.css'

//  prop ereditate dalla Home attraverso lo stato locale che aggiorna lo stato con il nuovo vlore inserito nella ricerca
export default function SearchBar({ search, setSearch }) {

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