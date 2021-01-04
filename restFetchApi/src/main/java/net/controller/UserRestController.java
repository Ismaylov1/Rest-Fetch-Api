package net.controller;

import com.google.gson.Gson;
import net.model.User;
import net.service.RoleServiceImpl;
import net.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping(value = "/rest")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping
    public String allUsersJS() {
        Gson gson = new Gson();
        String json = gson.toJson(userService.listUsers());
        return json;
    }

    @GetMapping(value = "/rest/oneUser")
    public String oneUser(User user , Principal principal) {
        Gson oneUser = new Gson();

        String oneUserS = oneUser.toJson(userService.getUserByName(principal.getName()));

        return oneUserS;
    }

    @PostMapping("admin/delete")
    public String deleteUser(String id){
        userService.remove(Long.parseLong(id));
        return id;
    }
}
