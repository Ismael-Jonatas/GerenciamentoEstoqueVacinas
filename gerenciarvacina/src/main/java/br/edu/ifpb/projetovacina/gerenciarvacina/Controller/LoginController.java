package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;


import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public Usuario validaLogin(@RequestBody Usuario usuario){
        Usuario usuarioLogado = new Usuario();
        if (this.loginService.getVerificaLogin(usuario.getMatricula(), usuario.getSenha())){
            usuarioLogado = this.loginService.getUsuarioLogado(usuario.getMatricula());
            if(usuarioLogado.getIsAdmin() == true){
                return usuarioLogado;
            }else{
                return usuarioLogado;
            }
        }else {
                return usuarioLogado;
        }
    }

}
