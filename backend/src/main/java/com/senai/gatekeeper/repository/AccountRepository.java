package com.senai.gatekeeper.repository;

import com.senai.gatekeeper.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByEmailAndPassword(String email, String password);
}
