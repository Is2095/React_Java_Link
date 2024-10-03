import { useState } from "react";
import { useRegistroActions } from "./useRegistroActions";

export function useBorrarRegistro() {
  const [resultado, setResultado] = useState({
    error: false,
    message: '',
    dato: null
  });
  const { removerRegistro } = useRegistroActions();

  const borrarRegistro = (id: string) => {
    fetch(`http://localhost:3001/api/borradoLogico/${id}`, {
      method: 'DELETE'
    })
      .then(ele => ele.json())
      .then(ele => {
        removerRegistro(id)
        setResultado(() => {
          return { ...resultado, error: ele.error, message: ele.message, data: null }
        })
      })
      .catch(error => console.log(error));

    return { borrarRegistro };
  };

  return { borrarRegistro, resultado };
}
