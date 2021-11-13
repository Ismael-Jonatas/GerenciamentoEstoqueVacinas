package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.TipoVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.TipoVacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Service
@RequestMapping("/")
public class TipoVacinaService {
    @Autowired
    private TipoVacinaRepository tipoVacinaRepository;

    public List<TipoVacina> getTipoVacina(){
        return this.tipoVacinaRepository.findAll();
    }

    public TipoVacina getTipoVacinaId(Long idTipoVacina){
        return  this.tipoVacinaRepository.findById(idTipoVacina).orElse(null);
    }

    public TipoVacina inserirOuAtualizar(TipoVacina tipoVacina){
        TipoVacina tipoVacinainserida = this.tipoVacinaRepository.save(tipoVacina);
        return tipoVacinainserida;
    }

    public void apagarTipoVacina(Long idTipoVacina){
        this.tipoVacinaRepository.deleteById(idTipoVacina);
    }

}
