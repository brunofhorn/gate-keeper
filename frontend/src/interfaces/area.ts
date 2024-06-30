import { ICompany } from "./company";

export interface IArea {
    id: string;
    name: string;
    description: string;
    companyId: string;
    companyTradeName: string;
    company?: ICompany;
}


export interface AreaFormProps {
    addArea: (area: IArea) => void;
    updateArea: (area: IArea) => void;
    editArea: IArea | null;
    setEditArea: (area: IArea | null) => void;
}

export interface AreaListProps {
    loadingAreas: boolean;
    areas: IArea[];
    filteredAreas: IArea[];
    setFilteredAreas: (areas: IArea[]) => void;
    onEdit: (areas: IArea) => void;
    onRemove: (areas: IArea) => void;
    onDetail: (area: IArea) => void;
}


export interface IAreaDetail {
    id?: string;
    name?: string;
    description?: string;
    companyId?: string;
    companyTradeName?: string;
}