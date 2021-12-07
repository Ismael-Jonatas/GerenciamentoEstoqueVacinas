package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "tb_registro_saida")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegistroSaida {
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

    public RegistroSaida(Usuario idUserSaida, Date dataSaida, LoteVacina lote, Integer quantidade, String descricaoSaida){
        this.idUsuario = idUserSaida;
        this.data = dataSaida;
        this.idLote = lote;
        this.quantidade = quantidade;
        this.descricao = descricaoSaida;

    }
}
