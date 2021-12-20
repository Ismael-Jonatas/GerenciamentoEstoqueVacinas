package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.RegistroSaidaRequest;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.RegistroSaida;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.RegistroSaidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class RegistroSaidaController {

    @Autowired
    RegistroSaidaService registroSaidaService;

    @GetMapping("/registros-de-saidas")
    public List<RegistroSaida> getRegistrosDeSaida(){
        return registroSaidaService.getRegistrosDeSaida();
    }

    @GetMapping("/registro-de-saida/{id}")
    public RegistroSaida getRegistroDeSaidaPorId(@PathVariable Long idRegistroDeSaida){
        return registroSaidaService.getRegistroDeSaidaPorId(idRegistroDeSaida);
    }

    @PostMapping("/registro-de-saida")
    public RegistroSaida inserirRegistro(@RequestBody RegistroSaidaRequest registroSaidaRequest){
        return registroSaidaService.inserirRegistro(registroSaidaRequest);
    }

}
