import './SearchBar.css'

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