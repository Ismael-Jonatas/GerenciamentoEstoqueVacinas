package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.DTO.RegistroSaidaRequest;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.RegistroSaida;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegistroSaidaService {

    @Autowired
    private RegistroSaidaRepository registroSaidaRepository;
    @Autowired
    private LoteVacinaRepository loteVacinaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private LoteVacinaService loteVacinaService;


    public List<RegistroSaida> getRegistrosDeSaida(){
        return this.registroSaidaRepository.findAll();
    }

    public RegistroSaida getRegistroDeSaidaPorId(Long idRegistroSaida){
        return this.registroSaidaRepository.findById(idRegistroSaida).orElse(null);
    }

    @Transactional
    public RegistroSaida inserirRegistro(RegistroSaidaRequest registroSaidaRequest){
        RegistroSaida registroDeSaida = this.registroSaidaRepository.save(registroSaidaRequest.
                toRegistroSaida(usuarioRepository, loteVacinaRepository, loteVacinaService));
        return registroDeSaida;
    }
}
