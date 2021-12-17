package br.edu.ifpb.projetovacina.gerenciarvacina.DTO;


import br.edu.ifpb.projetovacina.gerenciarvacina.Model.*;


import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.LoteVacinaRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.UsuarioRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.LoteVacinaService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroEntradaRequest {
    private Long idUsuario;
    private Date data;
    private Long idLote;
    private Integer quantidade;
    private String descricao;



    public RegistroEntrada toRegistroEntrada(UsuarioRepository usuarioRepository, LoteVacinaRepository loteVacinaRepository, LoteVacinaService loteVacinaService){
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        Optional<LoteVacina> loteVacina = loteVacinaRepository.findById(idLote);

        RegistroEntrada registroEntrada = new RegistroEntrada(usuario.get(), data, loteVacina.get(), quantidade, descricao);

        return  registroEntrada;
    }

}
