import { useEffect, useState } from "react";
import { ResultadoTipos } from "../types.d";

export function useModal({ resultado }: { resultado: ResultadoTipos }) {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const resetModal = () => {
    setModal(false);
  }

  useEffect(() => {
    if (resultado.dato !== null || resultado.error || resultado.message !== '') {
      setModal(true);
      setMessage(resultado.message);
    }
  }, [resultado]);

  return { resetModal, modal, message };
}