package hu.bme.iit.webapp.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="users")
public class Users {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    private String password;
    private String name;
    private String email;
    private String role;

    public Users(){}
    public Users(Integer id, String password, String name, String email, String role) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
