package br.edu.ifpb.projetovacina.gerenciarvacina.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioLogadoRequest {

    private String Matricula;
    private String Senha;

}
