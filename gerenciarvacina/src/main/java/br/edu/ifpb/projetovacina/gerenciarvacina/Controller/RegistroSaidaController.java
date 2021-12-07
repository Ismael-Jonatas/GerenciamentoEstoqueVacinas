package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.RegistroSaidaRequest;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.RegistroSaida;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.RegistroSaidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class RegistroSaidaController {

    @Autowired
    RegistroSaidaService registroSaidaService;

    @GetMapping("/registrosdesaidas")
    public List<RegistroSaida> getRegistrosDeSaida(){
        return registroSaidaService.getRegistrosDeSaida();
    }

    @GetMapping("/registrodesaida/{id}")
    public RegistroSaida getRegistroDeSaidaPorId(@PathVariable Long idRegistroDeSaida){
        return registroSaidaService.getRegistroDeSaidaPorId(idRegistroDeSaida);
    }

    @PostMapping("/registrodesaida")
    public RegistroSaida inserirRegistro(@RequestBody RegistroSaidaRequest registroSaidaRequest){
        return registroSaidaService.inserirRegistro(registroSaidaRequest);
    }

}
