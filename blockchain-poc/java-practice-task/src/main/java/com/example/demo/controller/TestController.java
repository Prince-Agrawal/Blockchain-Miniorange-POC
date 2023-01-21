package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Configuration
public class TestController {
    @Autowired
    UserRepository userRepository;

    @Value("${xecurify.secret.customer_key}")
    private String userBucket;

    @GetMapping("/access")
    public String getValue(){
        return userBucket;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = new ArrayList<>();
            userRepository.findAll().forEach(users::add);

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("try startingmj...............");
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/user")
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        try {
//            User _user = userRepository
//                    .save(new User(user.getUsername() , user.getEmail()));
//            return new ResponseEntity<>(_user, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/user")
    public String getUser() {
        return "Hello";
    }
}
