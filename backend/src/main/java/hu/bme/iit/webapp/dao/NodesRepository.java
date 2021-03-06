package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Nodes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NodesRepository extends CrudRepository<Nodes, Integer> {
    @Query("SELECT nodes FROM Nodes nodes WHERE nodes.machine_type = :id")
    Optional<List<Nodes>> getNodesByMachineType(@Param("id") Integer id);

    @Query("SELECT nodes FROM Nodes nodes WHERE nodes.type = :type")
    Optional<List<Nodes>> getNodesByType(@Param("type") String type);

    @Query("SELECT nodes FROM Nodes nodes WHERE nodes.position = :type")
    Optional<List<Nodes>> getNodesByPosition(@Param("type") String type);
}
