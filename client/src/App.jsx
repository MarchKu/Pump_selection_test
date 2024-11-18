import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Catalog from "./components/catalog";
import PumpSelection from "./components/pump_selection";
import More_info from "./components/more_info";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/pump-selection" element={<PumpSelection />} />
        <Route path="/more-info/:id" element={<More_info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
