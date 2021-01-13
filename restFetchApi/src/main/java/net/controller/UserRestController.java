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
    User replaceUser(@RequestBody User newUser, @PathVariable Long id) {
        if (userService.getUserById(id).getId() == id) {
            User oldUser = userService.getUserById(id);
            oldUser.setUsername(newUser.getUsername());
            oldUser.setLastname(newUser.getLastname());
            oldUser.setPassword(newUser.getPassword());
            oldUser.setAge(newUser.getAge());
            oldUser.setRoles(newUser.getRoles());

            return oldUser;
        } else {
            newUser.setId(id);
            userService.add(newUser);
            return newUser;
        }
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
