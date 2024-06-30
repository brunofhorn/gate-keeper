"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input, User } from "@nextui-org/react";
import DynamicIcon from "../../helpers/DynamicIcon";
import { Loading } from "../Loading";
import { maskCpf } from "@/service/functions/maskCpf";
import { columnsVisitor } from "@/config/columnsTable";
import { IVisitor, VisitorListProps } from "@/interfaces/visitor";
import { maskMobile } from "@/service/functions/maskMobile";

export default function VisitorList({ loadingVisitors, visitors, filteredVisitors, setFilteredVisitors, onEdit, onRemove, onDetail }: VisitorListProps) {
    const renderCell = useCallback((visitor: IVisitor, columnKey: keyof IVisitor | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex justify-center gap-2">
                    <Tooltip content="Visualizar Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onDetail(visitor)}>
                                <DynamicIcon icon="FaEye" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar Visitante">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onEdit(visitor)}>
                                <DynamicIcon icon="FaPencil" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar Visitante">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <a onClick={() => onRemove(visitor)}>
                                <DynamicIcon icon="FaTrash" />
                            </a>
                        </span>
                    </Tooltip>
                </div>
            );
        }

        const cellValue = visitor[columnKey] as string;
        switch (columnKey) {

            case "name":
                return (
                    <p className="text-bold text-sm">{cellValue}</p>
                );
            case "cpf":
                return (
                    <p className="text-bold text-sm">{maskCpf(cellValue)}</p>
                );
            case "mobile":
                return (
                    <p className="text-bold text-sm">{maskMobile(cellValue)}</p>
                );
            default:
                return cellValue;
        }
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredVisitors(
            visitors.filter(visitor =>
                visitor.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [search, visitors]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVisitors.slice(indexOfFirstItem, indexOfLastItem);

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
                    !loadingVisitors && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                total={Math.ceil(filteredVisitors.length / itemsPerPage)}
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
                <TableHeader columns={columnsVisitor}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentItems} isLoading={loadingVisitors} loadingContent={<Loading />} emptyContent="Nenhum visitante cadastrado">
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IVisitor)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
