import { useState } from "react";
import { useRegistroActions } from "./useRegistroActions";
import { type ResultadoTipos, type Elemento } from "../types.d";

export function useBuscarRegistros() {
  const { addRegistros } = useRegistroActions();
  const [resultadoBusqueda, setResultadoBusqueda] = useState<ResultadoTipos>({
    error: false,
    dato: null,
    message: ''
  });

  const BuscarRegistros = ({ elemento }: { elemento: Elemento }) => {
    if (!elemento.area && !elemento.valor) return;
    fetch('http://localhost:3001/api/buscar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [elemento.area]: elemento.valor })
    })
      .then(ele => ele.json())
      .then(ele => {
        if (ele.error) {
          addRegistros(ele.data);
          setResultadoBusqueda(() => { return { ...resultadoBusqueda, error: ele.error, message: ele.message } });
        } else {
          addRegistros(ele.data);
        }
      })
      .catch(error => console.log(error, 'error buscar'));
  };

  return { BuscarRegistros, resultadoBusqueda, setResultadoBusqueda };
}