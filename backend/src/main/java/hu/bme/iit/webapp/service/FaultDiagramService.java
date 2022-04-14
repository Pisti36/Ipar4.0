package hu.bme.iit.webapp.service;

import hu.bme.iit.webapp.dao.FaultDiagramRepository;
import hu.bme.iit.webapp.model.FaultDiagram;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FaultDiagramService {
    FaultDiagramRepository faultDiagramRepository;

    FaultDiagramService(FaultDiagramRepository faultDiagramRepository){
        this.faultDiagramRepository = faultDiagramRepository;
    }

    public FaultDiagram getDiagramById(int id){
        return faultDiagramRepository.findById(id).get();
        //optional objektumot ad vissza, le kell kezelni
    }

    public List<FaultDiagram> getAllDiagram(){
        List<FaultDiagram> list = new ArrayList<>();
        faultDiagramRepository.findAll().forEach(list::add);
        return list;
    }

    public FaultDiagram save(FaultDiagram diagram){
        faultDiagramRepository.save(diagram);
        return diagram;
    }

    public FaultDiagram find(Integer diagram_id){
        return faultDiagramRepository.findById(diagram_id).get();
    }

    public void delete(FaultDiagram diagram){
        faultDiagramRepository.delete(diagram);
    }

    public List<FaultDiagram> getDiagramsByMachineTypeId(Integer id){
        return faultDiagramRepository.getDiagramsByMachineTypeId(id);
    }
/*
    public List<FaultDiagramRepository.CountModel> getCount(){
        //List<FaultDiagramRepository.CountModel> list = new ArrayList<>();
        //faultDiagramRepository.getFaultCount().forEach(list::add);
        //return list;

        return faultDiagramRepository.getFaultCount();
    }
*/

    public List<CountModel> getCount(){
        List<CountModel> list = new ArrayList<>();
        faultDiagramRepository.getFaultCount().forEach(e -> {
            list.add(new CountModel(e.get(0), e.get(1)));
        });
        return list;
    }

    public class CountModel{
        Integer typeId;
        Integer count;

        public CountModel(Integer typeId, Integer count) {
            this.typeId = typeId;
            this.count = count;
        }

        public Integer getTypeId() {
            return typeId;
        }


        public Integer getCount() {
            return count;
        }

    }
}
