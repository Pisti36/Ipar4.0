package hu.bme.iit.webapp.dao;

import hu.bme.iit.webapp.model.Users;
import org.springframework.data.repository.CrudRepository;

public interface UsersRepository extends CrudRepository<Users, Integer> {

}
