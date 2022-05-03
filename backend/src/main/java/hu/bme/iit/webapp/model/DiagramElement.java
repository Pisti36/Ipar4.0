package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="diagram_elements")
public class DiagramElement {

    public DiagramElement(){}
    public DiagramElement(
            Integer id,
            String type,
            String position,
            String content,
            boolean isLeaf,
            String machine_type,
            String image_link,
            String video_link,
            String next) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.content = content;
        this.isLeaf = isLeaf;
        this.machine_type = machine_type;
        this.image_link = image_link;
        this.video_link = video_link;
        this.next = next;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String type;
    private String position;
    private String content;
    private Boolean isLeaf;
    private String machine_type;
    private String image_link;
    private String video_link;
    private String next;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) { this.position = position; }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMachine_type() { return machine_type; }

    public void setMachine_type(String machine_type) {
        this.machine_type = machine_type;
    }

    public boolean isIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(boolean isLeaf) {
        this.isLeaf = isLeaf;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String leaf_solution) {
        this.next = leaf_solution;
    }

    public String getImage_link() {
        return image_link;
    }

    public void setImage_link(String image_link) {
        this.image_link = image_link;
    }

    public String getVideo_link() {
        return video_link;
    }

    public void setVideo_link(String video_link) {
        this.video_link = video_link;
    }
}
