export interface IVisitor {
    id: string;
    name: string;
    cpf: string;
    mobile: string;
}

export interface VisitorFormProps {
    addVisitor: (visitor: IVisitor) => void;
    updateVisitor: (visitor: IVisitor) => void;
    editVisitor: IVisitor | null;
    setEditVisitor: (visitor: IVisitor | null) => void;
}


export interface VisitorListProps {
    loadingVisitors: boolean;
    visitors: IVisitor[];
    filteredVisitors: IVisitor[];
    setFilteredVisitors: (visitors: IVisitor[]) => void;
    onEdit: (visitors: IVisitor) => void;
    onRemove: (visitors: IVisitor) => void;
    onDetail: (visitor: IVisitor) => void;
}

export interface IVisitorDetail {
    id?: string;
    name?: string;
    cpf?: string;
    mobile?: string;
}