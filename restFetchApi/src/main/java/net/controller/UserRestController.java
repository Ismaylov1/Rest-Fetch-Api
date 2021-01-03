package net.controller;

import com.google.gson.Gson;
import net.model.Role;
import net.model.User;
import net.service.RoleServiceImpl;
import net.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/rest")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping
    public String AllUsersJS() {
        Gson gson = new Gson();
        String json = gson.toJson(userService.listUsers());
        return json;
    }
    @GetMapping(value = "/oneUser")
    public String allUsers(Model model, Principal principal) {
        Gson oneUser = new Gson();
        String oneUserS = oneUser.toJson(userService.getUserByName(principal.getName()));

        return oneUserS;
    }
}
