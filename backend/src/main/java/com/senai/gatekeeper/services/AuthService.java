package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Account;

public interface AuthService {
    Account login(String email, String password);
}
