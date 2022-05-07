package hu.bme.iit.webapp.dao;


import hu.bme.iit.webapp.model.Machines;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface MachinesRepository extends CrudRepository<Machines, Integer> {
    @Query("SELECT count(*) FROM Machines machine WHERE machine.machineTypeId = :id")
    Optional<Integer> getCountById(@Param("id") Integer id);

    @Query("SELECT machine FROM Machines machine WHERE machine.machineTypeId = :id")
    Optional<List<Machines>> getMachinesByMachineTypeId(@Param("id") Integer id);
}