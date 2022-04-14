package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.MachineRepository;
import hu.bme.iit.webapp.model.Machine;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class MachineService {
    MachineRepository machineRepository;

    MachineService(MachineRepository m){
        this.machineRepository = m;
    }

    public Integer getCountById(Integer index){
        return machineRepository.getCountById(index).get();
    }

    public List<Machine> findAll(){
        List<Machine> list = new ArrayList<>();
        machineRepository.findAll().forEach(list::add);
        return list;
    }

    public Machine findById(Integer id) {
        return machineRepository.findById(id).get();
    }


    public List<Machine> findByMachineTypeId (Integer machineTypeId){
        return machineRepository.getMachinesByMachineTypeId(machineTypeId).orElse(null);
    }

    public Machine save (Machine machine){
        machineRepository.save(machine);
        return machine;
    }

    public void delete(Machine machine){
        machineRepository.delete(machine);
    }

}
