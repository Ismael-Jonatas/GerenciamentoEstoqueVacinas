package br.edu.ifpb.projetovacina.gerenciarvacina.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name="id_fornecedor")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //notnull
    private String nome;
    //notnull
    private String cnpj;
    @OneToMany(mappedBy = "idFornecedor")
    @JsonIgnore
    private List<LoteVacina> loteVacina = new ArrayList<>();

    public void putListLoteVacina(LoteVacina loteVacinainserida){
        this.loteVacina.add(loteVacinainserida);
    }
}
