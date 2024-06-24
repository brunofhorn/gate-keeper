package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    Company getCompanyById(String id);

    Company saveCompany(Company company);

    Company updateCompany(String id, Company company);

    void deleteCompany(String id);
}