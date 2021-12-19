package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.RegistroEntradaRequest;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.RegistroEntrada;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegistroEntradaService {

    @Autowired
    private RegistroEntradaRepository registroEntradaRepository;
    @Autowired
    private LoteVacinaRepository loteVacinaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private LoteVacinaService loteVacinaService;


    public List<RegistroEntrada> getRegistrosDeEntrada(){
        return this.registroEntradaRepository.findAll();
    }

    public RegistroEntrada getRegistroDeEntradaPorId(Long idRegistroEntrada){
        return this.registroEntradaRepository.findById(idRegistroEntrada).orElse(null);
    }

    @Transactional
    public RegistroEntrada inserirRegistro(RegistroEntradaRequest registroEntradaRequest){
        RegistroEntrada registroDeEntrada = this.registroEntradaRepository.save(registroEntradaRequest.
                toRegistroEntrada(usuarioRepository, loteVacinaRepository, loteVacinaService));
        return registroDeEntrada;
    }

//    @Transactional
//    public RegistroEntrada inserirRegistro(RegistroEntrada registroEntrada){
//        RegistroEntrada registroDeEntrada = this.registroEntradaRepository.save(registroEntrada);
//        return registroDeEntrada;
//    }

}
