export interface LoteCreate{
  id?: number
  dataVencimento: Date
  descricao: string
  quantidade: number
  idFornecedor: number
  idTipo: number
}
