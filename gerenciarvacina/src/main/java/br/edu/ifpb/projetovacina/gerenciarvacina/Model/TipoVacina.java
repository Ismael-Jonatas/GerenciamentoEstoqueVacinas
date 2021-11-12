package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_tipovacina")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoVacina {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String Descricao;
    @OneToMany(mappedBy = "idTipo")
    private List<LoteVacina> loteVacina = new ArrayList<>();
}
