"use client";

import { useEffect, useState } from "react";
import CompanyForm from "@/layouts/components/company/CompanyForm";
import CompanyList from "@/layouts/components/company/CompanyList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { ICompany } from "@/interfaces/company";
import { toast } from "react-toastify";
import Modal from "@/layouts/components/Modal";
import { CompanyDetail } from "@/layouts/components/company/CompanyDetail";

export default function Companies() {
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);
    const [editCompany, setEditCompany] = useState<ICompany | null>(null);
    const [detailCompany, setDetailCompany] = useState<ICompany | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
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
            a.tradeName.localeCompare(b.tradeName)
        );

        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies);
    };

    const updateCompany = (updatedCompany: ICompany) => {
        const updatedCompanies = companies.map((company) =>
            company.id === updatedCompany.id ? updatedCompany : company
        ).sort((a, b) => a.tradeName.localeCompare(b.tradeName));

        setCompanies(updatedCompanies);
        setFilteredCompanies(updatedCompanies);
    };

    const handleEditCompany = (company: ICompany | null) => {
        setEditCompany(company);
    };

    const handleDetailCompany = (company: ICompany | null) => {
        setDetailCompany(company);
        setShowDetailModal(true);
    };

    const confirmRemoveCompany = async () => {
        if (companyToRemove !== null) {
            try {
                const response = await fetch(`/api/company/${companyToRemove.id}`, {
                    method: 'DELETE',
                });

                setShowConfirmModal(false);

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
        setShowConfirmModal(false);
    };

    const handleRemoveCompany = (company: ICompany) => {
        setCompanyToRemove(company);
        setShowConfirmModal(true);
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
                    onDetail={handleDetailCompany}
                />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir a empresa <b>{companyToRemove?.tradeName}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveCompany}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveCompany} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveCompany} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            <Modal
                open={showDetailModal}
                title="Detalhes da Empresa"
                message={<CompanyDetail {...detailCompany} />}
                size="3xl"
                onCancel={() => setShowDetailModal(false)}
                buttons={[
                    <Button color="danger" variant="light" onClick={() => setShowDetailModal(false)} key={2}>
                        Fechar
                    </Button>
                ]}
            />


        </>
    );
}