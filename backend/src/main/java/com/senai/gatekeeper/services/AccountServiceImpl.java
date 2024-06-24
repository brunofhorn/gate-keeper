package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Account;
import com.senai.gatekeeper.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(String id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conta não encontrada com ID: " + id));
    }

    @Override
    public Account createAccount(Account account) {
        account.setCreatedAt(new Date());
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(String id, Account account) {
        Account existingAccount = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conta não encontrada com ID: " + id));
        existingAccount.setFirstName(account.getFirstName());
        existingAccount.setLastName(account.getLastName());
        existingAccount.setEmail(account.getEmail());
        existingAccount.setTwoFactorCode(account.getTwoFactorCode());
        existingAccount.setArea(account.getArea());
        return accountRepository.save(existingAccount);
    }

    @Override
    public void deleteAccount(String id) {
        accountRepository.deleteById(id);
    }
}
