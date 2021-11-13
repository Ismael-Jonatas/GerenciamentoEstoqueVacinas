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
    private Long id;
    //notnull
    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor idFornecedor;
    private Integer quantidade;
    //notnull
    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoVacina idTipo;
    private Date dataVencimento;
    private String descricao;

    public LoteVacina(Fornecedor fornecedor, Integer quantidade, TipoVacina tipoVacina, Date dataVencimento, String descricao){
        this.idFornecedor = fornecedor;
        this.quantidade = quantidade;
        this.idTipo = tipoVacina;
        this.dataVencimento = dataVencimento;
        this.descricao = descricao;
    }

}
