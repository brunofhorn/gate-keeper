package com.senai.gatekeeper.repositories;

import com.senai.gatekeeper.models.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByEmailAndPassword(String email, String password);
}
