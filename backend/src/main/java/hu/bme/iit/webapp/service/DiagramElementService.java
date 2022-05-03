package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.DiagramElementRepository;
import hu.bme.iit.webapp.model.DiagramElement;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class DiagramElementService {
    DiagramElementRepository daiagramElementrepository;

    public DiagramElementService(DiagramElementRepository daiagramElementrepository) {
        this.daiagramElementrepository = daiagramElementrepository;
    }

    public List<DiagramElement> getAllQuestions(){
        List<DiagramElement> list = new ArrayList<>();
        daiagramElementrepository.findAll().forEach(list::add);
        return list;
    }

    public DiagramElement findById(Integer id) {
        return daiagramElementrepository.findById(id).orElse(null);
    }

    public List<DiagramElement> findByMachineType (String machine_type){
        return daiagramElementrepository.getDiagramElementByMachineType(machine_type).orElse(null);
    }

    public DiagramElement save (DiagramElement diagramElement){
        daiagramElementrepository.save(diagramElement);
        return diagramElement;
    }

    public void delete(DiagramElement diagramElement){
        daiagramElementrepository.delete(diagramElement);
    }

}
