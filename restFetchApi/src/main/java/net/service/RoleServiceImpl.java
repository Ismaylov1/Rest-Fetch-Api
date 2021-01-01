package net.service;

import net.dao.RoleRepository;
import net.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl {

    RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }




    public Role getRoleByName(String role) {
        return roleRepository.findByName(role);
    }


    public List<Role> listRoles() {
        return roleRepository.findAll();
    }
}
