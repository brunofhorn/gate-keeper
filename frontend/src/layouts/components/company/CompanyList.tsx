"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input } from "@nextui-org/react";
import DynamicIcon from "../../helpers/DynamicIcon";
import { CompanyListProps, ICompany } from "@/interfaces/company";
import { Loading } from "../Loading";
import { columnsCompany } from "@/config/columnsTable";
import { maskCnpj } from "@/service/functions/maskCnpj";
import { maskPhone } from "@/service/functions/maskPhone";

export default function CompanyList({ loadingCompanies, companies, filteredCompanies, setFilteredCompanies, onEdit, onRemove, onDetail }: CompanyListProps) {
    const renderCell = useCallback((company: ICompany, columnKey: keyof ICompany | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex justify-center gap-2">
                    <Tooltip content="Visualizar Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onDetail(company)}>
                                <DynamicIcon icon="FaEye" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar Empresa">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onEdit(company)}>
                                <DynamicIcon icon="FaPencil" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar Empresa">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <a onClick={() => onRemove(company)}>
                                <DynamicIcon icon="FaTrash" />
                            </a>
                        </span>
                    </Tooltip>
                </div>
            );
        }

        const cellValue = company[columnKey];

        switch (columnKey) {
            case "companyName":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                        <p className="text-bold text-sm text-default-400">{company.tradeName}</p>
                    </div>
                );
            case "cnpj":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{maskCnpj(cellValue)}</p>
                    </div>
                );
            case "phone":
                return (
                    <>
                        {maskPhone(cellValue)}
                    </>
                );
            case "floor":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue} {company?.floor && `/ ${company.room}`}</p>
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
        setFilteredCompanies(
            companies.filter(company =>
                company.tradeName.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [search, companies]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);

    const onClear = useCallback(() => {
        setSearch("");
        setCurrentPage(1);
    }, []);

    return (
        <>
            <Table
                aria-label="Tabela de Empresas"
                isStriped
                bottomContent={
                    !loadingCompanies && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                total={Math.ceil(filteredCompanies.length / itemsPerPage)}
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
                                placeholder="Buscar por nome fantasia..."
                                startContent={<DynamicIcon icon={"FaMagnifyingGlass"} />}
                                value={search}
                                onClear={() => onClear()}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                }
            >
                <TableHeader columns={columnsCompany}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentItems} isLoading={loadingCompanies} loadingContent={<Loading />} emptyContent="Nenhuma empresa cadastrada">
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof ICompany)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
