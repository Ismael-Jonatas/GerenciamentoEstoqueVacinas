package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_lotevacina")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class LoteVacina {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idLote;
    //notnull
    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor idFornecedor;
    private int quantidade;
    //notnull
    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoVacina idTipo;
    private Date dataVencimento;
    private String descricao;

}
