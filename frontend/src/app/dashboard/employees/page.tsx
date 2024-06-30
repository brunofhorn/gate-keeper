"use client";

import { IEmployee } from "@/interfaces/employee";
import Modal from "@/layouts/components/Modal";
import EmployeeForm from "@/layouts/components/employee/EmployeeForm";
import PageTitle from "@/layouts/partials/PageTitle";
import { Button, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Employees() {
    const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);
    const [editEmployee, setEditEmployee] = useState<IEmployee | null>(null);
    const [detailEmployee, setDetailEmployee] = useState<IEmployee | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [employeeToRemove, setEmployeeToRemove] = useState<IEmployee | null>(null);

    useEffect(() => {
        setLoadingEmployees(true);

        const fetchEmployees = async () => {
            const data: IEmployee[] = await fetch('/api/employee').then(res => res.json());

            setEmployees(data);
            setFilteredEmployees(data);
            setLoadingEmployees(false);
        };

        fetchEmployees();
    }, []);

    const addEmployee = (newEmployee: IEmployee) => {
        const updatedEmployees = [...employees, newEmployee].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
    };

    const updateEmployee = (updatedEmployee: IEmployee) => {
        const updatedEmployees = employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
        ).sort((a, b) => a.name.localeCompare(b.name));

        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
    };

    const handleEditEmployee = (employee: IEmployee | null) => {
        setEditEmployee(employee);
    };

    const handleDetailEmployee = (employee: IEmployee | null) => {
        setDetailEmployee(employee);
        setShowDetailModal(true);
    };

    const confirmRemoveEmployee = async () => {
        if (employeeToRemove !== null) {
            try {
                const response = await fetch(`/api/employee/${employeeToRemove.id}`, {
                    method: 'DELETE',
                });

                setShowConfirmModal(false);

                if (response.ok) {
                    toast.success("O funcionário foi removido com sucesso.");
                    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeToRemove.id));
                    setFilteredEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeToRemove.id));
                } else {
                    toast.error("Ocorreu um erro ao tentar remover o funcionário.");
                }
            } catch (error) {
                toast.error("Ocorreu um erro ao tentar remover o funcionário.");
                console.error('Erro ao remover o funcionário:', error);
            } finally {
                setEmployeeToRemove(null);
                setLoadingEmployees(false);
            }
        }
    };

    const cancelRemoveEmployee = () => {
        setEmployeeToRemove(null);
        setShowConfirmModal(false);
    };

    const handleRemoveEmployee = (employee: IEmployee) => {
        setEmployeeToRemove(employee);
        setShowConfirmModal(true);
    };

    return (
        <>
            <PageTitle title="Dispositivos" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <EmployeeForm
                    addEmployee={addEmployee}
                    editEmployee={editEmployee}
                    setEditEmployee={setEditEmployee}
                    updateEmployee={updateEmployee}
                />
                <Spacer y={8} />
            </div>
            <Modal
                open={showConfirmModal}
                title="Confirmar Exclusão"
                message={<div className="text-center"><p>Tem certeza que deseja excluir o funcionário <b>{employeeToRemove?.name}</b>?</p><small>Esta ação não poderá ser desfeita.</small></div>}
                onCancel={cancelRemoveEmployee}
                buttons={[
                    <Button color="primary" onPress={confirmRemoveEmployee} key={"confirm_button"}>
                        Confirmar
                    </Button>,
                    <Button color="danger" variant="light" onClick={cancelRemoveEmployee} key={"cancel_button"}>
                        Cancelar
                    </Button>
                ]}
            />
            {/* <Modal
                open={showDetailModal}
                title="Detalhes do Funcionário"
                message={<EmployeeDetail {...detailEmployee} />}
                size="3xl"
                onCancel={() => setShowDetailModal(false)}
                buttons={[
                    <Button color="danger" variant="light" onClick={() => setShowDetailModal(false)} key={2}>
                        Fechar
                    </Button>
                ]}
            /> */}
        </>
    );
}