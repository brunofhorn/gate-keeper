package com.senai.gatekeeper.service;

import com.senai.gatekeeper.models.Account;

public interface AuthService {
    Account login(String email, String password);
}
