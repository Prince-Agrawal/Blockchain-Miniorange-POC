package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "contact_number")
    private String phone_number;

    public User(String email, String username, String phone_number) {
        this.email = email;
        this.username = username;
        this.phone_number = phone_number;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }


    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public User(long id, String username, String email, String phone_number) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone_number = phone_number;
    }

    public User() {
    }

}
