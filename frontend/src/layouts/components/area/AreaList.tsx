"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input } from "@nextui-org/react";
import DynamicIcon from "../../helpers/DynamicIcon";
import { Loading } from "../Loading";
import { AreaListProps, IArea } from "@/interfaces/area";
import { columnsArea } from "@/config/columnsTable";

export default function AreaList({ loadingAreas, areas, filteredAreas, setFilteredAreas, onEdit, onRemove, onDetail }: AreaListProps) {
    const renderCell = useCallback((area: IArea, columnKey: keyof IArea | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex justify-center gap-2">
                    <Tooltip content="Visualizar Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onDetail(area)}>
                                <DynamicIcon icon="FaEye" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar Área">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onEdit(area)}>
                                <DynamicIcon icon="FaPencil" />
                            </a>
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar Área">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <a onClick={() => onRemove(area)}>
                                <DynamicIcon icon="FaTrash" />
                            </a>
                        </span>
                    </Tooltip>
                </div>
            );
        }

        const cellValue = area[columnKey] as string;

        switch (columnKey) {
            case "name":
                return (
                    <p className="text-bold text-sm">{cellValue}</p>
                );
            case "description":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue.slice(0, 99)}{cellValue.length > 99 && "..."}</p>
                    </div>
                );
            case "companyTradeName":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
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
        setFilteredAreas(
            areas.filter(area =>
                area.name.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [search, areas]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAreas.slice(indexOfFirstItem, indexOfLastItem);

    const onClear = useCallback(() => {
        setSearch("");
        setCurrentPage(1);
    }, []);

    return (
        <>
            <Table
                aria-label="Tabela de Áreas"
                isStriped
                bottomContent={
                    !loadingAreas && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                total={Math.ceil(filteredAreas.length / itemsPerPage)}
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
                <TableHeader columns={columnsArea}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            width={column.uid === "description" ? 300 : 100}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentItems} isLoading={loadingAreas} loadingContent={<Loading />} emptyContent="Nenhuma área cadastrada">
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IArea)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
