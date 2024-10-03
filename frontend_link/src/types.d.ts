export interface RegistroId {
  id: string | undefined
}

export interface DatosRegistro {
  id: string,
  area: string,
  titulo: string,
  lenguaje: string,
  capa: boolean,
  link: string,
  descripcion: string,
  ejemplo: string
  date?: string
  dateEditado?: string
}
export interface UpDateDatosRegistro {
  id: string,
  area?: string,
  titulo?: string,
  lenguaje?: string,
  capa?: boolean,
  link?: string,
  descripcion?: string,
  ejemplo?: string
}
export interface Datos {
  data: DatosRegistro[]
}
export interface ResultadoTipos {
  error: boolean,
  dato: DatosRegistro[] | null
  message: string
}
export interface AreaSelect {
  elemento: string,
  value: string
}

export type Elemento = {
  area: string,
  valor: string
}