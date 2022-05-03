package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.DiagramElement;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DiagramElementRepository extends CrudRepository<DiagramElement, Integer> {
    @Query("SELECT question FROM Diagram_elements diagram_elements WHERE diagram_elements.machine_type = :machine_type")
    Optional<List<DiagramElement>> getDiagramElementByMachineType(@Param("machine_type") String machine_type);
}
