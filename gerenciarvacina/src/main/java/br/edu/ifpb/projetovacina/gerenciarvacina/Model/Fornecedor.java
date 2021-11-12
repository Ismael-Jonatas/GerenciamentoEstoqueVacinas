package br.edu.ifpb.projetovacina.gerenciarvacina.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_fornecedor",
        uniqueConstraints = {@UniqueConstraint(columnNames = "cnpj"),
                             @UniqueConstraint(columnNames = "nome")})
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Fornecedor {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idFornecedor;
    //notnull
    private String nome;
    //notnull
    private String cnpj;
    @OneToMany(mappedBy = "idFornecedor")
    private List<LoteVacina> loteVacina = new ArrayList<>();
}
