package br.edu.ifpb.projetovacina.gerenciarvacina.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Registro {
    private long idUserEntrada;
    private Date dataEntrada;
    private Date dataSaida;
    private long idVacina;
    private String descricaoSaida;
    private long idUserSaida;
}
