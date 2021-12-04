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
@Table(name = "tb_tipovacina")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoVacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String nome;
    private String Descricao;
    @OneToMany(mappedBy = "idTipo")
    @JsonIgnore
    private List<LoteVacina> loteVacina = new ArrayList<>();

    public void putListLoteVacina(LoteVacina loteVacinainserida){
        this.loteVacina.add(loteVacinainserida);
    }

}
