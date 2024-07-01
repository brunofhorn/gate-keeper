"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input, User } from "@nextui-org/react";
import DynamicIcon from "../../helpers/DynamicIcon";
import { Loading } from "../Loading";
import { EmployeeListProps, IEmployee } from "@/interfaces/employee";
import { maskCpf } from "@/service/functions/maskCpf";
import { columnsEmployee } from "@/config/columnsTable";

export default function EmployeeList({ loadingEmployees, employees, filteredEmployees, setFilteredEmployees, onEdit, onRemove, onDetail }: EmployeeListProps) {
    const renderCell = useCallback((employee: IEmployee, columnKey: keyof IEmployee | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex justify-center gap-2">
                    <Tooltip content="Visualizar Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onDetail(employee)}>
                                <DynamicIcon icon="FaEye" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar Funcionário">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onEdit(employee)}>
                                <DynamicIcon icon="FaPencil" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar Funcionário">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <a onClick={() => onRemove(employee)}>
                                <DynamicIcon icon="FaTrash" />
                            </a>
                        </span>
                    </Tooltip>
                </div>
            );
        }

        const cellValue = employee[columnKey] as string;
        switch (columnKey) {

            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: employee.avatar,
                            showFallback: true,
                            fallback: <DynamicIcon icon="FaUser" />
                        }}
                        description={employee.email}
                        name={cellValue}
                    >
                        {employee.email}
                    </User>
                );
            case "cpf":
                return (
                    <p className="text-bold text-sm">{maskCpf(cellValue)}</p>
                );
            case "company":
                return (
                    <p className="text-bold text-sm">{employee.company.tradeName}</p>
                );
            case "department":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                        <p className="text-bold text-sm text-default-400">{employee.role}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [search, employees]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    const onClear = useCallback(() => {
        setSearch("");
        setCurrentPage(1);
    }, []);

    return (
        <>
            <Table
                aria-label="Tabela de Funcionários"
                isStriped
                bottomContent={
                    !loadingEmployees && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                total={Math.ceil(filteredEmployees.length / itemsPerPage)}
                                initialPage={1}
                                onChange={(page) => handlePageChange(page)}
                            />
                        </div>
                    )
                }
                topContent={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-3 items-end">
                            <Input
                                isClearable
                                className="w-full sm:max-w-[44%]"
                                placeholder="Buscar por nome..."
                                startContent={<DynamicIcon icon={"FaMagnifyingGlass"} />}
                                value={search}
                                onClear={() => onClear()}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                }
            >
                <TableHeader columns={columnsEmployee}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentItems} isLoading={loadingEmployees} loadingContent={<Loading />} emptyContent="Nenhum funcionário cadastrado">
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IEmployee)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
