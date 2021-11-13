package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios(){
        return this.usuarioService.getUsuarios();
    }

    @GetMapping("/usuario/{id}")
    public Usuario getUsuariPorId(@PathVariable("id") Long idusuario){
        return this.usuarioService.getUsuarioPorId(idusuario);
    }

    @PostMapping("/usuario")
    public Usuario inserirUsuario(@RequestBody Usuario usuario){
        return this.usuarioService.inserirOuAtuaizar(usuario);
    }

    @PutMapping("/usuario/{id}")
    public Usuario atualizarUsuario(@RequestBody Usuario usuario){
        return this.usuarioService.inserirOuAtuaizar(usuario);
    }

    @DeleteMapping("/usuario/{id}")
    public void apagarUsuario(@PathVariable("id") Long id){
        this.usuarioService.apagarUsuario(id);
    }

}


