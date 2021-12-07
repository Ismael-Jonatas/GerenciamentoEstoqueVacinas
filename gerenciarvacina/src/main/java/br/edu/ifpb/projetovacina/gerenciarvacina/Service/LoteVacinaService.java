package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.FornecedorRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.LoteVacinaRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.TipoVacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.LoteVacinaRequest;

import java.util.List;


@Service
public class LoteVacinaService {

    @Autowired
    private LoteVacinaRepository loteVacinaRepository;
    @Autowired
    private FornecedorRepository fornecedorRepository;
    @Autowired
    private TipoVacinaRepository tipoVacinaRepository;

    public List<LoteVacina> getLoteVacinas(){
        return this.loteVacinaRepository.findAll();
    }

    public LoteVacina getLoteVacinaId(Long idLoteVacina){
        return this.loteVacinaRepository.findById(idLoteVacina).orElse(null);
    }

    @Transactional
    public LoteVacina inserirLoteVacina(LoteVacinaRequest loteVacinaRequest){
        LoteVacina loteVacincaInserida = this.loteVacinaRepository.save(loteVacinaRequest.
                toLotevacina(fornecedorRepository, tipoVacinaRepository));
        return loteVacincaInserida;
    }

    @Transactional
    public LoteVacina atualizaLoteVacina(LoteVacina loteVacina){
        LoteVacina loteVacinaInserida = this.loteVacinaRepository.save(loteVacina);
        return loteVacinaInserida;
    }

    public void apagarVacina(Long idLoteVacina){
        this.loteVacinaRepository.deleteById(idLoteVacina);
    }

}
