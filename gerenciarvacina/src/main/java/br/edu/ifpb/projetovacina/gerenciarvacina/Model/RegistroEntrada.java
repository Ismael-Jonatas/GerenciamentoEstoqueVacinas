package br.edu.ifpb.projetovacina.gerenciarvacina.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "tb_registro_entrada")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegistroEntrada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario idUsuario;
    private Date data;
    @ManyToOne
    @JoinColumn(name = "id_lote")
    private LoteVacina idLote;
    private Integer quantidade;
    private String descricao;

    public RegistroEntrada(Usuario idUserEntrada, Date dataEntrada, LoteVacina lote, Integer quantidade, String descricaoEntrada){
        this.idUsuario = idUserEntrada;
        this.data = dataEntrada;
        this.idLote = lote;
        this.quantidade = quantidade;
        this.descricao = descricaoEntrada;

    }

    @Override
    public String toString() {
        return "RegistroEntrada{" +
                "id=" + id +
                ", idUsuario=" + idUsuario +
                ", data=" + data +
                ", idLote=" + idLote +
                ", quantidade=" + quantidade +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
