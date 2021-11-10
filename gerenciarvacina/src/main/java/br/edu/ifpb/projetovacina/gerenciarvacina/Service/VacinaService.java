package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Vacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VacinaService {
    @Autowired
    private VacinaRepository vacinaRepository;

    public List<Vacina> getVacinas(){
        return this.vacinaRepository.findAll();
    }

    public Vacina getVacinaId(Long idVacina){
        return this.vacinaRepository.findById(idVacina).orElse(null);
    }

    @Transactional
    public Vacina inserirOuAtualizar(Vacina vacina){
        Vacina vacincaInserida = this.vacinaRepository.save(vacina);
        return vacincaInserida;
    }

    public void apagarVacina(Long idVacina){
        this.vacinaRepository.deleteById(idVacina);
    }

}
