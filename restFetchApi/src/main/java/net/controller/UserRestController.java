package net.controller;

import com.google.gson.Gson;
import net.model.User;
import net.service.RoleServiceImpl;
import net.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(value = "/rest")
public class UserRestController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private RoleServiceImpl roleService;

    //    @GetMapping
//    public Page<User> allUsersJS(Pageable pageable) {
////        return userService.listUsersM(pageable);}

    @GetMapping
    public ResponseEntity<List<User>> allUsersJS() {
        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    @GetMapping(value = "/rest/oneUser")
    public ResponseEntity<User> oneUser(User user, Principal principal) {

        return new ResponseEntity<>(userService.getUserByName(principal.getName()), HttpStatus.OK);
    }

    @PostMapping("delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.remove(id);
        return id.toString();
    }
}
