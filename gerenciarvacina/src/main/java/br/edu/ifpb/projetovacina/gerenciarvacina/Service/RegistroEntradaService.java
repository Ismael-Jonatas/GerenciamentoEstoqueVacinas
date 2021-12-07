package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Fornecedor;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.TipoVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.FornecedorRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.RegistroEntradaRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.TipoVacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistroEntradaService {

    @Autowired
    private RegistroEntradaRepository registroEntradaRepository;



//    public LoteVacina toLotevacina(FornecedorRepository fornecedorRepository, TipoVacinaRepository tipoVacinaRepository){
//        Optional<Fornecedor> fornecedor = fornecedorRepository.findById(idFornecedor);
//        Optional<TipoVacina> Vacina = tipoVacinaRepository.findById(idVacina);
//
//        LoteVacina loteVacina = new LoteVacina(fornecedor.get(), quantidade, Vacina.get(), dataVencimento, descricao);
//        fornecedor.get().putListLoteVacina(loteVacina);
//        tipoVacina.get().putListLoteVacina(loteVacina);
//        return  loteVacina;
//    }
}
