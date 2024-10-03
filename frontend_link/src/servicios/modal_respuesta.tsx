interface Props {
  text: string,
  modal: boolean,
  resetModal: () => void
}

export const Modal_Respuesta = ({ resetModal, text, modal }: Props) => {

  const displayModal = modal ? 'grid' : 'none';

  return (
    <section>
      <div style={{ display: `${displayModal}` }} className={`modalRespuesta`}>
        {
          modal ?
            <footer className="modal">
              <h5 style={{ color: 'black' }}>{text}</h5>
              <button className="botonModal" onClick={resetModal}>Cerrar</button>
            </footer>
            : null
        }
      </div>
    </section>
  );
}