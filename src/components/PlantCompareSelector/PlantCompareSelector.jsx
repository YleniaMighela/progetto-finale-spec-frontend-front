// importo il css
import './PlantCompareSelector.css';

//  props che qriceve da PlantComparator (plants: è l'array di oggetti della pianta, selectedId: sarà l'id dela pianta selezionata,onSelect:funzione che permette di passare l'id dell pianta selezionata dall'utente)
export default function PlantCompareSelector({ plants, selectedId, onSelect }) {
    return (
        <div className="container_compare">
            <label className="compare-label">
                Pianta:
            </label>
            {/* quando selectedId non è stato ancora selezionato mostra Seleziona una pianta*/}
            <select
                className="compare-dropdown"
                value={selectedId || ''}
                onChange={(e) => onSelect(e.target.value)}

            >
                <option value=""> Seleziona una pianta </option>

                {/* mappa tutte le piante */}
                {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                        Nome:{plant.title}
                        Categoria: {plant.category}
                    </option>
                ))}
            </select>
        </div>
    );
}