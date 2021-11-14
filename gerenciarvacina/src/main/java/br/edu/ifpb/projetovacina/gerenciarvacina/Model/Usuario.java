package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tb_usuario",
        uniqueConstraints = {@UniqueConstraint(columnNames = "cpf"),
                             @UniqueConstraint(columnNames = "matricula")})
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //notnull
    private String nome;
    //notnull
    private String cpf;
    //notnull
    private String matricula;
    //notnull
    private String senha;
    private Boolean isAdmin;

}
