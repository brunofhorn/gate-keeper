package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Account;
import com.senai.gatekeeper.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account login(String email, String password) {
        return accountRepository.findByEmailAndPassword(email, password);
    }
}
