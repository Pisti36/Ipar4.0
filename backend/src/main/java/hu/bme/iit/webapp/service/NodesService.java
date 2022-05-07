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

    public List<Nodes> getAllQuestions(){
        List<Nodes> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public Nodes findById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<Nodes> findByDiagramId (Integer machineTypeId){
        return repository.getNodesByMachineType(machineTypeId).orElse(null);
    }

    public Nodes save (Nodes question){
        repository.save(question);
        return question;
    }

    public void delete(Nodes question){
        repository.delete(question);
    }

}
