import { Fornecedor } from './fornecedor.model';
import { TipoVacina } from './tipoVacina.model';

export interface Lote{
  id?: number
  dataVencimento: Date
  descricao: string
  quantidade: number
  idFornecedor: Fornecedor
  idTipo: TipoVacina
}
