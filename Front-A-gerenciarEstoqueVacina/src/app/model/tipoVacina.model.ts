import { Lote } from "./lote.model";

export interface TipoVacina{
  id?:number
  nome:string
  descricao:string
  loteVacina: Lote[]
}
