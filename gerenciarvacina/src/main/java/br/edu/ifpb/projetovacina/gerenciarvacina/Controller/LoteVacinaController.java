package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.Service.LoteVacinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoteVacinaController {

    @Autowired
    private LoteVacinaService loteVacinaService;
}
