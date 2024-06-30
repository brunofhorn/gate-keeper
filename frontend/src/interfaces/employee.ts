import { ICompany } from "./company";

export interface IEmployee {
    id: string;
    name: string;
    mobile: string;
    email: string;
    cpf: string;
    avatar: string;
    birthDate: string;
    department: string;
    role: string;
    company: ICompany;
}

export interface EmployeeFormProps {
    addEmployee: (employee: IEmployee) => void;
    updateEmployee: (employee: IEmployee) => void;
    editEmployee: IEmployee | null;
    setEditEmployee: (employee: IEmployee | null) => void;
}