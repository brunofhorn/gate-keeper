package com.senai.gatekeeper.service;

import com.senai.gatekeeper.models.Account;

import java.util.List;

public interface AccountService {

    List<Account> getAllAccounts();

    Account getAccountById(String id); // String para o ID no MongoDB

    Account createAccount(Account account);

    Account updateAccount(String id, Account account); // String para o ID no MongoDB

    void deleteAccount(String id); // String para o ID no MongoDB
}
