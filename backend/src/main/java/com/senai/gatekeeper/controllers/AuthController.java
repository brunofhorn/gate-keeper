package com.senai.gatekeeper.controllers;

import com.senai.gatekeeper.dto.LoginDTO;
import com.senai.gatekeeper.models.Account;
import com.senai.gatekeeper.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Account res = authService.login(loginDTO.getEmail(), loginDTO.getPassword());
        if (res == null) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }
}
