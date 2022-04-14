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
    MachineTypeRepository machineTypeRepository;

    MachineTypeService(MachineTypeRepository m){
        this.machineTypeRepository = m;
    }

    public List<MachineType> getAllMachineTypes(){
        List<MachineType> list = new ArrayList<>();
        machineTypeRepository.findAll().forEach(list::add);
        return list;
    }

    public MachineType findById(Integer id) {
        return machineTypeRepository.findById(id).get();
    }

    public MachineType save (MachineType machine){
        machineTypeRepository.save(machine);
        return machine;
    }

    public void delete(MachineType machine){
        machineTypeRepository.delete(machine);
    }

}
