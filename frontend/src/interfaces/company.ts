export interface ICompany {
    id: string;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    andar: string;
    sala: string;
}

export interface CompanyFormProps {
    addCompany: (company: ICompany) => void;
    updateCompany: (company: ICompany) => void;
    editCompany: ICompany | null;
    setEditCompany: (company: ICompany | null) => void;
}

export interface CompanyListProps {
    loadingCompanies: boolean;
    companies: ICompany[];
    filteredCompanies: ICompany[];
    setFilteredCompanies: (companies: ICompany[]) => void;
    onEdit: (company: ICompany) => void;
    onRemove: (company: ICompany) => void;
    onDetail: (company: ICompany) => void;
}

export interface ICompanyDetail {
    cnpj?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    telefone?: string;
    andar?: string;
    sala?: string;
}