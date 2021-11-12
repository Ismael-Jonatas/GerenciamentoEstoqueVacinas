package br.edu.ifpb.projetovacina.gerenciarvacina.Controller;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Fornecedor;
import br.edu.ifpb.projetovacina.gerenciarvacina.Service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping("/fornecedores")
    public List<Fornecedor> getFornecerdores(){
        return this.fornecedorService.getFornecedores();
    }

    @GetMapping("/fornecedores/{id}")
    public Fornecedor getFornecedorId(@PathVariable("id") Long idFornecedor){
        return this.fornecedorService.getFornecedorId(idFornecedor);
    }

    @PostMapping("/fornecedores")
    public Fornecedor inserirFornecedor(@RequestBody Fornecedor fornecedor){
        return this.fornecedorService.inserirOuAtualizar(fornecedor);
    }

    @PutMapping("/fornecedores/{id}")
    public  Fornecedor atualizarFornecedor(@RequestBody Fornecedor fornecedor){
        return this.fornecedorService.inserirOuAtualizar(fornecedor);
    }

    @DeleteMapping("/fornecedores/{id}")
    public void deletarFornecedor(@PathVariable("id") Long idFornecedor){
        this.fornecedorService.apagarFonecedor(idFornecedor);
    }
}
