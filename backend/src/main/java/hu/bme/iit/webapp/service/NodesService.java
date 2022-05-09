package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.NodesRepository;
import hu.bme.iit.webapp.model.Nodes;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class NodesService {
    NodesRepository repository;

    public NodesService(NodesRepository nodesrepository) {
        this.repository = nodesrepository;
    }

    public List<Nodes> getAllNodes(){
        List<Nodes> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public Nodes findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<Nodes> findByMachineTypeId (Integer machineTypeId){
        return repository.getNodesByMachineType(machineTypeId).orElse(null);
    }

    public List<Nodes> findByType (String type){
        return repository.getNodesByType(type).orElse(null);
    }

    public List<Nodes> findByPosition (String type){
        return repository.getNodesByPosition(type).orElse(null);
    }

    public Nodes save (Nodes node){
        repository.save(node);
        return node;
    }

    public void delete(Nodes node){
        repository.delete(node);
    }

}
