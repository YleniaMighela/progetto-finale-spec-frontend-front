import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";

// importo le pagine
import HomePage from "./pages/HomePage/HomePage";
import PlantDetails from "./pages/PlantDetails/PlantDetails";
import PlantComparator from "./pages/PlantComparator/PlantComparator";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/plants/:id" element={<PlantDetails />} />
            <Route path="/compare" element={<PlantComparator />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
