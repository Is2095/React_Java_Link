import { useState } from "react";
import { useRegistroActions } from "./useRegistroActions";
import { type UpDateDatosRegistro } from "../types";

export function useEditarRegistro() {
  const [resultado, setResultado] = useState({
    error: false,
    message: '',
    dato: null
  });
  const { actualizarState } = useRegistroActions();

  const editarRegistroDB = (datos: UpDateDatosRegistro) => {
    fetch('http://localhost:3001/api/editar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(ele => ele.json())
      .then(ele => {
        if (ele.error) {
          setResultado(() => {
            return { ...resultado, error: ele.error, message: ele.message }
          });
        } else {
          actualizarState({ id: ele.data.id, ...ele.data });
          setResultado(() => {
            return { ...resultado, error: ele.error, message: ele.message, dato: ele.dato }
          });
        }
      })
      .catch(error => console.log(error.message)
      );
  };

  return { editarRegistroDB, resultado };
}