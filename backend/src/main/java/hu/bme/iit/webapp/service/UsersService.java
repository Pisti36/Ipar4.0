package hu.bme.iit.webapp.service;


import hu.bme.iit.webapp.dao.UsersRepository;
import hu.bme.iit.webapp.model.Users;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class UsersService {
    UsersRepository repository;

    UsersService(UsersRepository u){
        this.repository = u;
    }

    public List<Users> getAllUsers(){
        List<Users> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }

    public Users findById(Integer id) {
        return repository.findById(id).get();
    }

    public Users save (Users user){
        repository.save(user);
        return user;
    }

    public void delete(Users user){
        repository.delete(user);
    }

}
