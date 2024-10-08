import IngresoElemento from './components/ingresoElemento';
import './App.css';
import { BusquedaElemento } from './components/BusquedaElemento';
import { Registros } from './components/Registros';

function App() {

  return (
    <div>
      <IngresoElemento />
      <BusquedaElemento />
      <Registros />
    </div>

  );
}

export default App;