package br.edu.ifpb.projetovacina.gerenciarvacina.DTO;


import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Fornecedor;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.TipoVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.FornecedorRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.TipoVacinaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.util.Date;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoteVacinaRequest {

    private Date dataVencimento;
    private String descricao;
    private Integer quantidade;
    private Long idFornecedor;
    private Long idTipoVacina;

    public LoteVacina toLotevacina(FornecedorRepository fornecedorRepository, TipoVacinaRepository tipoVacinaRepository){
        Optional<Fornecedor> fornecedor = fornecedorRepository.findById(idFornecedor);
        Optional<TipoVacina> tipoVacina = tipoVacinaRepository.findById(idTipoVacina);

        LoteVacina loteVacina = new LoteVacina(fornecedor.get(), quantidade, tipoVacina.get(), dataVencimento, descricao);
        fornecedor.get().putListLoteVacina(loteVacina);
        tipoVacina.get().putListLoteVacina(loteVacina);
        return  loteVacina;
    }
}
