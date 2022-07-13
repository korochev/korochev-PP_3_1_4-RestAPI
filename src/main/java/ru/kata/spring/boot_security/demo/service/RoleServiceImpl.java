package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;
import ru.kata.spring.boot_security.demo.model.Role;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {


    private RoleDAO roleDao;

    @Autowired
    public RoleServiceImpl(RoleDAO roleDao) {
        this.roleDao = roleDao;
    }


    @Override
    @Transactional(readOnly = true)
    public Role getRoleById(long id) {
        return roleDao.findById(id).get();
    }

    @Override
    @Transactional(readOnly = true)
    public Role getRoleByRoleName(String name) {
        return roleDao.findByName(name);
    }

    @Override
    public void save(Role role) {
        roleDao.save(role);
    }


    @Override
    public void delete(long id) {
        roleDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getDemandedRoles() {
        return roleDao.findAll();
    }

}