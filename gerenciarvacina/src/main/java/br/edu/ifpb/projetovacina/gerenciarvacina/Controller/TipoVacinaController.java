package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.TipoVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.TipoVacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class TipoVacinaController {

    @Autowired
    private TipoVacinaService tipoVacinaService;

    @GetMapping("/tipovacinas")
    public List<TipoVacina> getTipoVacinas(){
        return this.tipoVacinaService.getTipoVacina();
    }

    @GetMapping("/tipovacina/{id}")
    public TipoVacina getTipoVacinaId(@PathVariable("id") Long idTipoVacina){
        return this.tipoVacinaService.getTipoVacinaId(idTipoVacina);
    }

    @PostMapping("/tipovacina")
    public TipoVacina inserirTipoVacina(@RequestBody TipoVacina tipoVacina){
        return this.tipoVacinaService.inserirOuAtualizar(tipoVacina);
    }

    @PutMapping("/tipovacina/{id}")
    public TipoVacina atualizarTipoVacina(@RequestBody TipoVacina tipoVacina){
        return this.tipoVacinaService.inserirOuAtualizar(tipoVacina);
    }

    @DeleteMapping("/tipovacina{id}")
    public void apagarTipoVacina(@PathVariable Long idTipoVacina){
        this.tipoVacinaService.apagarTipoVacina(idTipoVacina);
    }
}
