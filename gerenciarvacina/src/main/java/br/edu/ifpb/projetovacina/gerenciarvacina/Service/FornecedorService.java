package br.edu.ifpb.projetovacina.gerenciarvacina.Service;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.Fornecedor;
import br.edu.ifpb.projetovacina.gerenciarvacina.Repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FornecedorService {
    @Autowired
    private FornecedorRepository fornecedorRepository;

    public List<Fornecedor> getFornecedores(){
        return this.fornecedorRepository.findAll();
    }

    public Fornecedor getFornecedorId(Long idFornecedor){
        return this.fornecedorRepository.findById(idFornecedor).orElse(null);
    }

    @Transactional
    public Fornecedor inserirOuAtualizar(Fornecedor fornecedor){
        Fornecedor fornecedorInserido = this.fornecedorRepository.save(fornecedor);
        return fornecedorInserido;
    }

    public void apagarFonecedor(Long id){
        this.fornecedorRepository.deleteById(id);
    }
}
