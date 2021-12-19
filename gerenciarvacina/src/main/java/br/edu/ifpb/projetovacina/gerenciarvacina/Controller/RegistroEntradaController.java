package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.RegistroEntradaRequest;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.RegistroEntrada;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.RegistroEntradaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/")
public class RegistroEntradaController {

    @Autowired
    RegistroEntradaService registroEntradaService;

    @GetMapping("/registros-de-entradas")
    public List<RegistroEntrada> getRegistrosDeEntrada(){
        return registroEntradaService.getRegistrosDeEntrada();
    }

    @GetMapping("/registro-de-entrada/{id}")
    public RegistroEntrada getRegistroDeEntradaPorId(@PathVariable Long idRegistroDeEntrada){
        return registroEntradaService.getRegistroDeEntradaPorId(idRegistroDeEntrada);
    }

    @PostMapping("/registro-de-entrada")
    public RegistroEntrada inserirRegistro(@RequestBody RegistroEntradaRequest registroEntradaRequest){
        return registroEntradaService.inserirRegistro(registroEntradaRequest);
    }

//    @PostMapping("/registro-de-entrada")
//    public RegistroEntrada inserirRegistro(@RequestBody RegistroEntrada registroEntrada){
//        return registroEntradaService.inserirRegistro(registroEntrada);
//    }


}

