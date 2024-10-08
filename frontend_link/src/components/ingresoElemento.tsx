import { FormEvent, useState } from 'react';
import { type DatosRegistro } from '../types.d';
import { useIngresoRegistro } from '../hooks/useIngresoRegistro';
import { useModal } from '../hooks/useModal';
import { AREAS_REGISTROS } from '../constantes';
import { ComponenteEntrada } from '../servicios/ComponenteEntradas';
import { Modal_Respuesta } from '../servicios/modal_respuesta';
import Select_Area from '../servicios/select_area';

const initialStateRegistro: DatosRegistro = {
  id: '',
  area: '',
  titulo: '',
  lenguaje: '',
  capa: false,
  link: '',
  descripcion: '',
  ejemplo: ''
};

export default function IngresoElemento() {
  const [registro, setRegistro] = useState<DatosRegistro>(initialStateRegistro);
  const { GuardarRegistro, resultado } = useIngresoRegistro();
  const { resetModal, modal, message } = useModal({ resultado });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    GuardarRegistro(registro);
    setRegistro(initialStateRegistro);
  };

  const handleChangeInputs = (key: string, value: string | boolean) => {
    setRegistro({
      ...registro,
      [key]: value
    });
  };

  return (
    <div className='pagina'>
      <header className='header'>
        <h2>
          Link importantes
        </h2>
        <h1>
          Ingrese los datos necesarios
        </h1>
      </header>

      <main className='main'>
        <form action="" onSubmit={handleSubmit} className='formulariototal'>
          <div className='divFormulario'>
            <div >
              <Select_Area onChange={handleChangeInputs} AREAS_REGISTROS={AREAS_REGISTROS} label="Área" value={registro.area} />
            </div>
            <div>
              <ComponenteEntrada label={"Título"} onChange={handleChangeInputs} name={"titulo"} id={"titulo"} type={"text"} value={registro.titulo} placeholderText={'método, imagen...'} />
            </div>
            <div>
              <ComponenteEntrada label={"Lenguaje"} onChange={handleChangeInputs} name={"lenguaje"} id={"lenguaje"} type={"text"} value={registro.lenguaje} placeholderText={'JS, React, Next, Node...'} />
            </div>
            <div>
              <ComponenteEntrada label={"capa gratuita?"} onChange={handleChangeInputs} name={"capa"} id={"capa"} type={"checkbox"} value={registro.capa} placeholderText={''} />
            </div>
            <div>
              <ComponenteEntrada label={"Link de acceso"} onChange={handleChangeInputs} name={"link"} id={"link"} type={"text"} value={registro.link} placeholderText={'https://....'} />
            </div>
            <div>
              <ComponenteEntrada label={"descripcion"} onChange={handleChangeInputs} name={"descripcion"} id={"descripcion"} type={"textarea"} value={registro.descripcion} placeholderText={''} />
            </div>
            <div>
              <ComponenteEntrada label={"Ejemplo"} onChange={handleChangeInputs} name={"ejemplo"} id={"ejemplo"} type={"textarea"} value={registro.ejemplo} placeholderText={''} />
            </div>
          </div>
          <button className='buttonGuardar' type='submit'>Guardar</button>
        </form>
        <Modal_Respuesta resetModal={resetModal} modal={modal} text={message} />
      </main>
    </div>
  );
}
{/*  <div className='inputForm'>
  <label htmlFor="area">Área</label>
  <input name='area' type="text" placeholder='Programación, matemáticas, cocina...' />
</div>
<div className='inputForm'>

  <Inputs onChange={handleChangeSelectArea} name={"titulo"} type={"text"} value={registro.titulo} label={'Título'} placeholderText={"método, imagen ..."} />

  {/* <label htmlFor="titulo">Título</label>
<input name='titulo' type="text" placeholder='método, imagen ...' /> 
</div>
<div className='inputForm'>
  <Inputs onChange={handleChangeSelectArea} name={"lenguaje"} type={"text"} value={registro.lenguaje} label={'Lenguaje'} placeholderText={"JS, React, Next, Node..."} />
  {/* <label htmlFor="lenguaje">lenguaje</label>
<input name='lenguaje' type="text" placeholder='JS, React, Next, Node...' /> 
</div>
<div className='inputForm'>
  <label htmlFor="capa">Capa gratuita</label>
  <input name='capa' type="checkbox" />
</div>
<div className='inputForm'>
  <Inputs onChange={handleChangeSelectArea} name={"link"} type={"text"} value={registro.link} label={'Link de acceso'} placeholderText={'https://....'} />
  {/* <label htmlFor="link">Link de acceso</label>
  <input name='link' type="text" placeholder='https://....' /> 
</div>
<div className='inputForm'>
  <label htmlFor="descripcion">descripción</label>
  <textarea name="descripcion" id="descripcion"></textarea>
</div>
<div className='inputForm'>
  <label htmlFor="ejemplo">Ejemplo</label>
  <textarea name="ejemplo" id="ejemplo"></textarea>
</div>*/}