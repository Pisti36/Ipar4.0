package hu.bme.iit.webapp.controller;



import hu.bme.iit.webapp.model.Users;
import hu.bme.iit.webapp.service.UsersService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/users")
@CrossOrigin(origins = "http://vm.ik.bme.hu:10813")
public class UsersController {

    private UsersService service;

    public UsersController(UsersService usersService) {
        this.service = usersService;
    }

    //User hozzáadása
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Users createUser(@Valid @RequestBody Users request){
        return service.save(request);
    }

    //User-ek listázása
    @GetMapping(path="/list")
    public @ResponseBody
    List<Users> getUsersList(){
        return service.getAllUsers();
    }

    //User keresése id alapján
    @GetMapping(path="/list/{id}")
    public @ResponseBody
    ResponseEntity<Users> getUserById(@PathVariable(value = "id") Integer id) {
        Users report = service.findById(id);
        return ResponseEntity.ok().body(report);
    }

    //User törlése
    @DeleteMapping(path="/list/{id}")
    public @ResponseBody
    Map<String, Boolean> deleteUserById(@PathVariable(value = "id") Integer id) {
        Users user = service.findById(id);
        service.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
