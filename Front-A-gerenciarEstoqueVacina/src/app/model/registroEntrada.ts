import {Lote} from "./lote.model";
import {Usuario} from "./usuario.model";

export interface RegistroEntrada{
  id?: number
  idUsuario: Usuario
  data: Date
  idLote: Lote
  quantidade: number
  descricao: string
}
