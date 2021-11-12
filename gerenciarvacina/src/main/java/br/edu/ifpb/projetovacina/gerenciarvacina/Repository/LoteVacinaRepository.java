package br.edu.ifpb.projetovacina.gerenciarvacina.Repository;

import br.edu.ifpb.projetovacina.gerenciarvacina.Model.LoteVacina;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import javax.persistence.TypedQuery;
//import java.util.List;

public interface LoteVacinaRepository extends JpaRepository<LoteVacina, Long> {

//    @Query("SELECT v FROM Vacina v where v.idTipo= id")
//    public List<Vacina> findByIdTipoVacina(Long id);

//    public List<Vacina> findByIdTipoVacina(long idTipo){
//        TypedQuery<Vacina> q = manager.createQuery("select v from tb_vacina v where v.idTipo", Vacina.class);
//        return q.getResultList();
//    }

}
