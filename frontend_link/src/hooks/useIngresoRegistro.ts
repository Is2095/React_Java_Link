import { useState } from "react";
import { type ResultadoTipos, type DatosRegistro } from "../types.d";

export function useIngresoRegistro() {
  const [resultado, setResultado] = useState<ResultadoTipos>({
    error: false,
    dato: null,
    message: ''
  });

  const GuardarRegistro = (datos: DatosRegistro) => {
    if (datos.titulo && datos.area && datos.descripcion && datos.lenguaje && datos.capa) {
      fetch('http://localhost:3001/api/registrolink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
        .then((res) => res.json())
        .then(res => {
          if (res.error) {
            setResultado(() => { return { ...resultado, error: res.error, message: res.message } });
          } else {
            setResultado(() => { return { ...resultado, error: res.error, dato: res.data, message: `el elemento " ${res.data.area} " fue guardado` } });
          }
        })
        .catch(error => console.log(error, 'error'));
    } else {
      setResultado(() => { return { ...resultado, error: true, message: 'problemas en los datos' } });
    }
  };

  return { GuardarRegistro, resultado };
}
