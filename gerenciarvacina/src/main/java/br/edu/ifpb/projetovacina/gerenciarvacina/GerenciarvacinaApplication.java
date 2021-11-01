package br.edu.ifpb.projetovacina.gerenciarvacina;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.UsuarioRepository;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.UsuarioService;


@SpringBootApplication
public class GerenciarvacinaApplication {
	public static void main(String[] args) {
		SpringApplication.run(GerenciarvacinaApplication.class, args);
	}
}
