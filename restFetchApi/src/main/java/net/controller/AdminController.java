package net.controller;

import net.service.RoleServiceImpl;
import net.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import net.model.Role;
import net.model.User;
import java.security.Principal;
import java.util.List;


@RequestMapping(value = "/")
@Controller
public class AdminController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping(value = "/admin")
    public String allUsers(Model model, Principal principal) {
        model.addAttribute("allUsers", userService.listUsers());
        model.addAttribute("oneUser", userService.getUserByName(principal.getName()));
        model.addAttribute("listRole", roleService.listRoles());
        model.addAttribute("newUser", new User());
        List<User> users = userService.listUsers();
        List<Role> roles = roleService.listRoles();
        return "admin";
    }
    
    //USER logic

    @GetMapping(value = "/user")
    public String clickMe(Model model, Principal principal) {
        model.addAttribute("oneUser", userService.getUserByName(principal.getName()));
        return "user";
    }

}
