"use client";

import { useEffect, useState } from "react";
import CompanyForm from "@/layouts/components/CompanyForm";
import CompanyList from "@/layouts/components/CompanyList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Spacer } from "@nextui-org/react";
import { ICompany } from "@/interfaces/company";
import { toast } from "react-toastify";
import ConfirmationModal from "@/layouts/components/ConfirmationModal";

export default function Companies() {
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);
    const [editCompany, setEditCompany] = useState<ICompany | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [companyToRemove, setCompanyToRemove] = useState<ICompany | null>(null);

    useEffect(() => {
        setLoadingCompanies(true);

        const fetchCompanies = async () => {
            const data: ICompany[] = await fetch('/api/company').then(res => res.json());
            setCompanies(data);
            setFilteredCompanies(data);
            setLoadingCompanies(false);
        };

        fetchCompanies();
    }, []);

    const addCompany = (newCompany: ICompany) => {
        const updatedCompanies = [...companies, newCompany].sort((a, b) =>
            a.nomeFantasia.localeCompare(b.nomeFantasia)
        );

        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies);
    };

    const updateCompany = (updatedCompany: ICompany) => {
        const updatedCompanies = companies.map((empresa) =>
            empresa.id === updatedCompany.id ? updatedCompany : empresa
        ).sort((a, b) => a.nomeFantasia.localeCompare(b.nomeFantasia));

        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies);
    };

    const handleEditCompany = (company: ICompany | null) => {
        setEditCompany(company);
    };

    const confirmRemoveCompany = async () => {
        if (companyToRemove !== null) {
            try {
                const response = await fetch(`/api/company/${companyToRemove.id}`, {
                    method: 'DELETE',
                });

                setShowModal(false);

                if (response.ok) {
                    toast.success("A empresa foi removida com sucesso.");
                    setCompanies(prevCompanies => prevCompanies.filter(company => company.id !== companyToRemove.id));
                    setFilteredCompanies(prevCompanies => prevCompanies.filter(company => company.id !== companyToRemove.id));
                } else {
                    toast.error("Ocorreu um erro ao tentar remover a empresa.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar remover a empresa.");
                console.error('Erro ao remover empresa:', error);
            } finally {
                setCompanyToRemove(null);
                setLoadingCompanies(false);
            }
        }
    };

    const cancelRemoveCompany = () => {
        setCompanyToRemove(null);
        setShowModal(false);
    };

    const handleRemoveCompany = (company: ICompany) => {
        setCompanyToRemove(company);
        setShowModal(true);
    };

    return (
        <>
            <PageTitle title="Empresas" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <CompanyForm
                    addCompany={addCompany}
                    updateCompany={updateCompany}
                    editCompany={editCompany}
                    setEditCompany={setEditCompany}
                />
                <Spacer y={8} />
                <CompanyList
                    loadingCompanies={loadingCompanies}
                    companies={companies}
                    filteredCompanies={filteredCompanies}
                    setFilteredCompanies={setFilteredCompanies}
                    onEdit={handleEditCompany}
                    onRemove={handleRemoveCompany}
                />
            </div>
            <ConfirmationModal
                open={showModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir a empresa <b>{companyToRemove?.nomeFantasia}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onConfirm={confirmRemoveCompany}
                onCancel={cancelRemoveCompany}
            />
        </>
    );
}