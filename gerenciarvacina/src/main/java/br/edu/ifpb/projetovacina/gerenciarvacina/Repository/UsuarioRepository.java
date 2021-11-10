package br.edu.ifpb.projetovacina.gerenciarvacina.Repository;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
