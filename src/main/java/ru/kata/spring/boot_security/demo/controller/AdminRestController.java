package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private UserService userService;
    private RoleService roleService;


    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping("/users")
    ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.showUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    ResponseEntity<User> getUser(@PathVariable(name = "id") Long id){
        return new ResponseEntity<>(userService.showById(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    ResponseEntity<User> newUser(@RequestBody User user){
        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/users/{id}")
    ResponseEntity<User> editUser(@RequestBody User user){
        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    ResponseEntity<Long> deleteUser(@PathVariable("id") Long id){
        userService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/roles")
    ResponseEntity<List<Role>>getAllRoles(){
        return new ResponseEntity<>(roleService.getDemandedRoles(), HttpStatus.OK);
    }

    @GetMapping("/roles/{id}")
    ResponseEntity<Role> getRoleById(@PathVariable("id") long id){
        return new ResponseEntity<>(roleService.getRoleById(id), HttpStatus.OK);
    }


}
