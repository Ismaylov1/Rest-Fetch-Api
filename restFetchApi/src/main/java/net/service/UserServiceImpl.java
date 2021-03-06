package net.service;

import net.dao.RoleRepository;
import net.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import net.model.User;
import net.model.Role;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserDetailsService {
    @Autowired
    private  UserRepository userRepository;


    public User getUserByName(String name) {
        return userRepository.findByUsername(name);
    }



    public User add(User user) {
       return userRepository.save(user);

    }


    public User updateUsers(User user) {
        return userRepository.save(user);
    }


    public void remove(long id) {
        userRepository.deleteById(id);
    }


    public User getUserById(long id) {
        User user = null;
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()){
            user = optionalUser.get();
        }
        return user;
    }


    public List<User> listUsers() {
        return userRepository.findAll();
    }
    public Page<User> listUsersM(Pageable pageable) {
        return userRepository.findAll(pageable);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for (Role role : user.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);


    }

}

