package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.MachinesRepository;
import hu.bme.iit.webapp.model.Machines;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class MachinesService {
    MachinesRepository repository;

    MachinesService(MachinesRepository m){
        this.repository = m;
    }

    public Integer getCountById(Integer index){
        return repository.getCountById(index).get();
    }

    public List<Machines> findAll(){
        List<Machines> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public Machines findById(Integer id) {
        return repository.findById(id).get();
    }

    public List<Machines> findByMachineTypeId (Integer machineTypeId){
        return repository.getMachinesByMachineTypeId(machineTypeId).orElse(null);
    }

    public Machines save (Machines machine){
        repository.save(machine);
        return machine;
    }

    public void delete(Machines machine){
        repository.delete(machine);
    }

}
