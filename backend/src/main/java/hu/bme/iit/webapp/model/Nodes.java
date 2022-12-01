package hu.bme.iit.webapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="nodes")
public class Nodes {

    public Nodes(){}
    public Nodes(
            Integer id,
            String type,
            String position,
            String content,
            String summary,
            String image_link,
            String video_link,
            Boolean isLeaf,
            String next,
            Integer machine_type) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.content = content;
        this.summary = summary;
        this.image_link = image_link;
        this.video_link = video_link;
        this.isLeaf = isLeaf;
        this.next = next;
        this.machine_type = machine_type;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String type;
    private String position;
    private String content;
    private String summary;
    private String image_link;
    private String video_link;
    private Boolean isLeaf;
    private String next;
    private Integer machine_type;


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

    public void setPosition(String position) {
        this.position = position;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public Boolean getLeaf() {
        return isLeaf;
    }

    public void setLeaf(Boolean leaf) {
        isLeaf = leaf;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public Integer getMachine_type() {
        return machine_type;
    }

    public void setMachine_type(Integer machine_type) {
        this.machine_type = machine_type;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
