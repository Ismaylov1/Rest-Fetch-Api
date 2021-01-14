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


    @GetMapping(value = "/rest/oneUser")
    public ResponseEntity<User> oneUser(User user, Principal principal) {

        return new ResponseEntity<>(userService.getUserByName(principal.getName()), HttpStatus.OK);
    }


    @PostMapping("delete/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        userService.remove(Long.parseLong(id));
        return id;
    }

    @PutMapping("/put/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        newUser.setId(id);
        if(newUser.getPassword().equals("")) {
            newUser.setPassword(userService.getUserById(id).getPassword());
        }
        return userService.updateUsers(newUser);
    }

    public static void main(String[] args) {
        User user = new User();
        System.out.println(user.toString());
    }

//                .map(employee -> {
//                    employee.setName(newEmployee.getName());
//                    employee.setRole(newEmployee.getRole());
//                    return repository.save(employee);
//                })
//                .orElseGet(() -> {
//                    newEmployee.setId(id);
//                    return repository.save(newEmployee);
//                });


}
