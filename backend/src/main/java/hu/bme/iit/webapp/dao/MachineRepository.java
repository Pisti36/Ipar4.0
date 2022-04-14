package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Machine;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MachineRepository extends CrudRepository<Machine, Integer> {
    @Query("SELECT count(*) FROM Machine machine WHERE machine.machineTypeId = :id")
    Optional<Integer> getCountById(@Param("id") Integer id);

    @Query("SELECT machine FROM Machine machine WHERE machine.machineTypeId = :id")
    Optional<List<Machine>> getMachinesByMachineTypeId(@Param("id") Integer id);
}
