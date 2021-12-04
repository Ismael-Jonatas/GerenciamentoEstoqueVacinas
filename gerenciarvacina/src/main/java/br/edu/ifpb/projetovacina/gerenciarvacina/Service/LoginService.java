package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Boolean getVerificaLogin(String matricula, String senha){
        return usuarioRepository.existsUsuarioByMatriculaAndSenha(matricula, senha);
    }

    public Usuario getUsuarioLogado(String matricula){
        return usuarioRepository.findUsuarioByMatricula(matricula);
    }

}
