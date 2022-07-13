package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDAO;
import ru.kata.spring.boot_security.demo.model.User;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, RoleService roleService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDAO = userDAO;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    @Transactional(readOnly = true)
    public List<User> showUsers() {
        return userDAO.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User showById(long id) {
        return userDAO.findById(id).get();
    }

    @Override
    public void saveUser(User user) {
        User anotherUser = this.findByUsername(user.getUsername());
        if (anotherUser == null || anotherUser.getId() == user.getId()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userDAO.save(user);
        }
    }


    @Override
    public void delete(Long id) {
        userDAO.deleteById(id);
    }


    @Override
    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return userDAO.findByEmail(username);
    }


}
