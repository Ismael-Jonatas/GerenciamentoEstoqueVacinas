package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository userRepository;

    public List<Usuario> getUsuarios() {
        return this.userRepository.findAll();
    }

    public Usuario getUsuarioPorId(Long idUsuario){
        return this.userRepository.findById(idUsuario).orElse(null);
    }

    @Transactional
    public Usuario inserirOuAtuaizar(Usuario usuario){
        Usuario usuarioInserido = this.userRepository.save(usuario);
        return usuarioInserido;
    }

    public void apagarUsuario(Long id){
        this.userRepository.deleteById(id);
    }

}
