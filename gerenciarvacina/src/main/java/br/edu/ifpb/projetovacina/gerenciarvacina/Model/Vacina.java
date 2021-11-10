package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tb_vacina")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vacina {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String lote;
    private int quantidade;
    private long idTipo;
    private String dataVencimento;
    private long idFornecedor;
}
