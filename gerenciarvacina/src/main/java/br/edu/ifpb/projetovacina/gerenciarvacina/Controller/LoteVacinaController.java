package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.LoteVacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.LoteVacinaRequest;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class LoteVacinaController {

    @Autowired
    private LoteVacinaService loteVacinaService;

    @GetMapping("/loteVacinas")
    public List<LoteVacina> getLoteVacinas(){
        return this.loteVacinaService.getLoteVacinas();
    }

    @GetMapping("/lotevacina/{id}")
    public LoteVacina getLoteVacinaId(@PathVariable Long idLoteVacina){
        return this.loteVacinaService.getLoteVacinaId(idLoteVacina);
    }

    @PostMapping("/lotevacina")
    public LoteVacina inserirLoteVacina(@RequestBody LoteVacinaRequest loteVacinaRequest){
        return this.loteVacinaService.inserirLoteVacina(loteVacinaRequest);
    }

    @PutMapping("/lotevacina/{id}")
    public LoteVacina atualizarLoteVacina(@RequestBody LoteVacina loteVacina){
        return this.loteVacinaService.atualizaLoteVacina(loteVacina);
    }

    @DeleteMapping("/lotevacina/{id}")
    public void apagarLoteVacina(@PathVariable Long idLoteVacina){
        this.loteVacinaService.apagarVacina(idLoteVacina);
    }

}
