
import { useRef, useState } from "react";
import { AREAS_CAMPOS_BUSQUEDA, AREAS_REGISTROS } from "../constantes";
import { useEditarRegistro } from "../hooks/useActualizarRegistro";
import { ComponenteEntrada } from "../servicios/ComponenteEntradas";
import Select_Area from "../servicios/select_area";
import { DatosRegistro, UpDateDatosRegistro } from "../types.d";
import { Actualizar, Remover } from "./Icons/icons";
import { useModal } from "../hooks/useModal";
import { useAppSelector } from "../hooks/useStore";
import { Modal_Respuesta } from "../servicios/modal_respuesta";
import { useBorrarRegistro } from "../hooks/useBorrarRegistro";

const initialStateEdicion: DatosRegistro = {
  id: '',
  area: '',
  titulo: '',
  lenguaje: '',
  capa: false,
  link: '',
  descripcion: '',
  ejemplo: ''
};

export const Registros = () => {
  const { registro } = useAppSelector((state) => state);
  const [editar, setEditar] = useState(false);
  const [editarId, setEditarId] = useState('');
  const [datosAEditar, setDatosAEditar] = useState<DatosRegistro>(initialStateEdicion);
  const datosOriginales = useRef<DatosRegistro>(initialStateEdicion);
  const { borrarRegistro } = useBorrarRegistro();
  const { editarRegistroDB, resultado } = useEditarRegistro();
  const { resetModal, modal, message } = useModal({ resultado });

  const handleRemover = (id: string) => {
    borrarRegistro(id);
  };

  const handleActualizar = (registro: DatosRegistro) => {
    if (registro?.id) {
      if (editarId === registro.id) setEditar(!editar);
      setEditarId(registro.id as string);
      setDatosAEditar(registro);
      datosOriginales.current = { ...registro };
    }
  };

  const handleChangeInputs = (key: string, value: string | boolean) => {
    setDatosAEditar({
      ...datosAEditar,
      [key]: value
    });
  };

  const handleEditar = (datos: DatosRegistro) => {
    let datosFiltrados: UpDateDatosRegistro = {
      id: ''
    };
    if (datosOriginales.current !== undefined) {
      datosFiltrados.id = datos.id;
      for (const x in datos) {
        const key = x as keyof DatosRegistro;
        if (datos[key] !== datosOriginales.current[key]) {
          datosFiltrados = { ...datosFiltrados, [key]: datos[key] };
        }
      }
      editarRegistroDB(datosFiltrados);
    }
    setEditar(false);
  };

  return (
    <main>
      {
        registro.length > 0 ?
          <table className="tableRegistro" >
            <thead>
              <tr>
                {
                  AREAS_CAMPOS_BUSQUEDA.map((ele, index) => {
                    return (
                      <th className="thGeneral" key={index}>{ele.elemento}</th>
                    )
                  })
                }
                <th>Ingreso</th>
                <th>Borrar Registro</th>
                <th>Editar Registro</th>
                <th>Edición</th>
              </tr>
            </thead>
            <tbody>
              {
                registro?.map((registro: DatosRegistro, index: number) => {
                  const color = index % 2 === 0 ? '#555' : '#999'
                  return (
                    <tr key={index} style={{ backgroundColor: color }}>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <Select_Area onChange={handleChangeInputs} AREAS_REGISTROS={AREAS_REGISTROS} label="" value={datosAEditar.area} />
                            : registro.area
                        }
                      </td>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"titulo"} id={"titulo"} type={"text"} value={datosAEditar.titulo} placeholderText={'método, imagen...'} />
                            : registro.titulo
                        }
                      </td>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"lenguaje"} id={"lenguaje"} type={"text"} value={datosAEditar.lenguaje} placeholderText={'JS, React, Next, Node...'} />
                            : registro.lenguaje
                        }
                      </td>

                      <td className="tdCapa">
                        {

                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"capa"} id={"capa"} type={"checkbox"} value={datosAEditar.capa} placeholderText={''} />
                            : registro.capa ? 'SI' : 'NO'
                        }
                      </td>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"link"} id={"link"} type={"text"} value={datosAEditar.link} placeholderText={'https://....'} />
                            : registro.link
                        }
                      </td>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"descripcion"} id={"descripcion"} type={"textarea"} value={datosAEditar.descripcion} placeholderText={''} />
                            : registro.descripcion
                        }
                      </td>

                      <td>
                        {
                          editarId === registro.id && editar
                            ? <ComponenteEntrada label={""} onChange={handleChangeInputs} name={"ejemplo"} id={"ejemplo"} type={"textarea"} value={datosAEditar.ejemplo} placeholderText={''} />
                            : registro.ejemplo
                        }
                      </td>

                      <td>{registro.date?.split('T')[0]}</td>

                      <td onClick={() => handleRemover(registro.id)}>
                        <Remover />
                      </td>
                      <td >
                        <div onClick={() => handleActualizar(registro)} >
                          <Actualizar />
                        </div>
                        {
                          editarId === registro.id && editar ? <button onClick={() => handleEditar(datosAEditar)} style={{ margin: '0', padding: '0' }}>guardar</button> : ''
                        }
                      </td>
                      {
                        registro.date?.toString() != registro.dateEditado?.toString()
                          ? <td>{registro.dateEditado?.split('T')[0]}</td>
                          : <td>-</td>
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          : ''
      }
      <Modal_Respuesta resetModal={resetModal} modal={modal} text={message} />
    </main>
  );
};