package net.controller;

import com.google.gson.Gson;
import net.model.User;
import net.service.RoleServiceImpl;
import net.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@CrossOrigin
@RequestMapping(value = "/rest")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping
    public String getUsers() {
        Gson gson = new Gson();
        String json = gson.toJson(userService.listUsers());
        return json;
    }


    @GetMapping(value = "/oneUser")
    public User oneUser(User user, Principal principal) {

        return userService.getUserByName(principal.getName());
    }


    @PostMapping("delete/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        userService.remove(Long.parseLong(id));
        return id;
    }

    @PostMapping("/add")
    User saveUser(@RequestBody User newUser) {
        return userService.add(newUser);
    }

    @PutMapping("/put/{id}")
    User updateUser(@RequestBody User updateUser, @PathVariable Long id) {
        updateUser.setId(id);
        if (updateUser.getPassword().equals("")) {
            updateUser.setPassword(userService.getUserById(id).getPassword());
            return userService.updateUsers(updateUser);
        } else {
            return userService.add(updateUser);
        }
    }




}
