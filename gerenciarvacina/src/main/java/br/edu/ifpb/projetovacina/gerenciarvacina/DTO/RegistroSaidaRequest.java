package br.edu.ifpb.projetovacina.gerenciarvacina.DTO;


import br.edu.ifpb.projetovacina.gerenciarvacina.Model.*;


import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.LoteVacinaRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.UsuarioRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.LoteVacinaService;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroSaidaRequest {
    private Long idUsuario;
    private Date data;
    private Long idLote;
    private Integer quantidade;
    private String descricao;



    public RegistroSaida toRegistroSaida(UsuarioRepository usuarioRepository, LoteVacinaRepository loteVacinaRepository, LoteVacinaService loteVacinaService){
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        Optional<LoteVacina> loteVacina = loteVacinaRepository.findById(idLote);

        if(loteVacina != null){
            LoteVacina attLote = loteVacinaService.getLoteVacinaId(idLote);
            Integer quant = attLote.getQuantidade() - quantidade;
            attLote.setQuantidade(quant);
            loteVacinaService.atualizaLoteVacina(attLote);
        }

        RegistroSaida registroSaida = new RegistroSaida(usuario.get(), data, loteVacina.get(), quantidade, descricao);

        return  registroSaida;
    }

}
