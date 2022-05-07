package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.MachineTypeRepository;
import hu.bme.iit.webapp.model.MachineType;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class MachineTypeService {
    MachineTypeRepository repository;

    MachineTypeService(MachineTypeRepository m){
        this.repository = m;
    }

    public List<MachineType> getAllMachineTypes(){
        List<MachineType> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public MachineType findById(Integer id) {
        return repository.findById(id).get();
    }

    public MachineType save (MachineType machine){
        repository.save(machine);
        return machine;
    }

    public void delete(MachineType machine){
        repository.delete(machine);
    }

}
