package com.senai.gatekeeper.services;

import com.senai.gatekeeper.models.Company;
import com.senai.gatekeeper.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElse(null);
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(String id, Company company) {
        Company existingCompany = getCompanyById(id);
        if (existingCompany != null) {
            existingCompany.setCorporateName(company.getCorporateName());
            existingCompany.setFantasyName(company.getFantasyName());
            existingCompany.setCnpj(company.getCnpj());
            existingCompany.setPhone(company.getPhone());
            existingCompany.setFloor(company.getFloor());
            existingCompany.setRoom(company.getRoom());
            return companyRepository.save(existingCompany);
        }
        return null;
    }

    public void deleteCompany(String id) {
        companyRepository.deleteById(id);
    }
}