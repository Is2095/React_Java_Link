import { useAppDispatch } from "./useStore";
import { deleteRegistroById, guardarRegistro, actualizarStateRegistro } from "../store/registro/slice";
import { DatosRegistro } from "../types";

export const useRegistroActions = () => {
  const dispatch = useAppDispatch();

  const addRegistros = (datosRegistro: DatosRegistro[]) => {
    dispatch(guardarRegistro(datosRegistro));
  };

  const removerRegistro = (id: string) => {
    dispatch(deleteRegistroById(id));
  };

  const actualizarState = (registroActualizado: DatosRegistro) => {
    dispatch(actualizarStateRegistro(registroActualizado));
  };

  return { removerRegistro, addRegistros, actualizarState };
}
