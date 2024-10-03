import debounce from "just-debounce-it";
import { ChangeEvent, useCallback, useState } from "react";
import { AREAS_CAMPOS_BUSQUEDA } from "../constantes";
import Select_Area from '../servicios/select_area';
import { Elemento } from "../types.d";
import { Registros } from "./Registros";
import { useBuscarRegistros } from "../hooks/useBuscarRegistros";
import { useModal } from "../hooks/useModal";
import { Modal_Respuesta } from "../servicios/modal_respuesta";

export const BusquedaElemento = () => {
  const [elementoABuscar, setElementoABuscar] = useState({
    area: '',
    valor: ''
  });
  const { BuscarRegistros, resultadoBusqueda, setResultadoBusqueda } = useBuscarRegistros();
  const { resetModal, modal, message } = useModal({ resultado: resultadoBusqueda });

  const deboounceBuscarRegistro = useCallback(
    debounce((elemento: Elemento) => {
      BuscarRegistros({ elemento });
    }, 800), [resultadoBusqueda]);

  const handleChangeBuscar = (key: string, value: string | boolean) => {
    if (value === '') {
      setResultadoBusqueda({ error: false, dato: [], message: '' });
    } else {
      setElementoABuscar({
        ...elementoABuscar,
        [key]: value
      });
    }
  };

  const handleBuscarElemento = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setElementoABuscar({
      ...elementoABuscar,
      valor
    });
    deboounceBuscarRegistro({ area: elementoABuscar.area, valor });
  };

  return (
    <div className="conteinerBusquedaElemento">
      <header className="hijoBusqueda">
        <Select_Area onChange={handleChangeBuscar} AREAS_REGISTROS={AREAS_CAMPOS_BUSQUEDA} label="Tema" value={elementoABuscar.area} />
        {
          elementoABuscar.area !== '' && <div> <label htmlFor="">ingrese palabra clave</label><input className="inputBusqueda" type="text" onChange={handleBuscarElemento} /></div>
        }

      </header>
      <main>
        <Registros />
      </main>
      {
        resultadoBusqueda.error
          ? <Modal_Respuesta resetModal={resetModal} modal={modal} text={message} />
          : ''
      }

    </div>
  );
};