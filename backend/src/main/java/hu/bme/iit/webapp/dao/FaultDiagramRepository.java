package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.FaultDiagram;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FaultDiagramRepository extends CrudRepository<FaultDiagram, Integer> {
    @Query("SELECT diagram.machine_type as typeId, count(*) as count FROM FaultDiagram diagram GROUP BY diagram.machine_type")
    List<List<Integer>> getFaultCount();

    @Query("SELECT diagram FROM FaultDiagram diagram WHERE diagram.machine_type = :id")
    List<FaultDiagram> getDiagramsByMachineTypeId(@Param("id") Integer id);
}
