package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.LoteVacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoteVacinaService {
    @Autowired
    private LoteVacinaRepository loteVacinaRepository;

    public List<LoteVacina> getVacinas(){
        return this.loteVacinaRepository.findAll();
    }

    public LoteVacina getVacinaId(Long idVacina){
        return this.loteVacinaRepository.findById(idVacina).orElse(null);
    }

    @Transactional
    public LoteVacina inserirOuAtualizar(LoteVacina loteVacina){
        LoteVacina vacincaInserida = this.loteVacinaRepository.save(loteVacina);
        return vacincaInserida;
    }

    public void apagarVacina(Long idVacina){
        this.loteVacinaRepository.deleteById(idVacina);
    }

}
