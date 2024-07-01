"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input, Chip } from "@nextui-org/react";
import DynamicIcon from "../../helpers/DynamicIcon";
import { Loading } from "../Loading";
import { columnsBadge } from "@/config/columnsTable";
import { BadgeListProps, IBadge } from "@/interfaces/badge";
import { maskCpf } from "@/service/functions/maskCpf";
import { formatDateToBrazilian } from "@/service/functions/formatDateToBrazilian";

export default function BadgeList({ loadingBadges, badges, filteredBadges, setFilteredBadges, onRemove, onDetail }: BadgeListProps) {
    const renderCell = useCallback((badge: IBadge, columnKey: keyof IBadge | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex justify-center gap-2">
                    <Tooltip content="Visualizar Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <a onClick={() => onDetail(badge)}>
                                <DynamicIcon icon="FaEye" />
                            </a>
                        </span>
                    </Tooltip>
                    {badge.active && (
                        <Tooltip color="danger" content="Inativar Crachá">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <a onClick={() => onRemove(badge)}>
                                    <DynamicIcon icon="FaToggleOn" />
                                </a>
                            </span>
                        </Tooltip>
                    )}
                </div>
            );
        }

        const cellValue = badge[columnKey] as string;

        switch (columnKey) {
            case "code":
                return (
                    <p className="text-bold text-sm">{cellValue}</p>
                );
            case "employee":
                return (
                    <div className="flex flex-col">
                        {badge.type === "FIXED" ? (
                            <>
                                <p className="text-bold text-sm">{badge.employee.name}</p>
                                <p className="text-bold text-tiny text-default-400">{badge.employee?.company?.tradeName}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-bold text-sm">{badge.visit.find(v => v.badgeId === badge.id)?.visitor.name}</p>
                                <p className="text-bold text-sm text-default-400">{maskCpf(badge.visit.find(v => v.badgeId === badge.id)?.visitor.cpf ?? "")}</p>
                            </>
                        )}
                    </div>
                );
            case "type":
                return (
                    <p className="text-bold text-sm">
                        <Chip color={cellValue === "FIXED" ? "primary" : "secondary"}>
                            {cellValue === "FIXED" ? "Funcionário" : "Visitante"}
                        </Chip>
                    </p>
                );
            case "visit":
                return (
                    <div className="flex flex-col">
                        {badge.type === "FIXED" ? (
                            <>
                                <p className="text-bold text-tiny text-default-400">Criado em: {new Date(badge.createdAt).toLocaleDateString("pt-BR")}</p>
                                <p className="text-bold text-tiny text-default-400">Indeterminado</p>
                            </>
                        ) : (
                            <>
                                <p className="text-bold text-tiny text-default-400">Início: {formatDateToBrazilian(badge.visit.find(v => v.badgeId === badge.id)?.startDate ?? "")}</p>
                                <p className="text-bold text-tiny text-default-400">Final: {formatDateToBrazilian(badge.visit.find(v => v.badgeId === badge.id)?.endDate ?? "")}</p>
                            </>
                        )}
                    </div>
                );
            case "active":
                return (
                    <Chip color={badge.active ? "success" : "danger"} size="sm" className="text-tiny">{badge.active ? "ATIVO" : "INATIVO"}</Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredBadges(
            badges.filter(badge =>
                badge.code.toLowerCase().includes(search.toLowerCase())
            )
        );
        setCurrentPage(1);
    }, [search, badges]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBadges.slice(indexOfFirstItem, indexOfLastItem);

    const onClear = useCallback(() => {
        setSearch("");
        setCurrentPage(1);
    }, []);

    return (
        <>
            <Table
                aria-label="Tabela de Dispositivos"
                isStriped
                bottomContent={
                    !loadingBadges && (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                total={Math.ceil(filteredBadges.length / itemsPerPage)}
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
                <TableHeader columns={columnsBadge}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            width={column.uid === "code" ? 10 : column.uid === "name" ? 300 : 100}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentItems} isLoading={loadingBadges} loadingContent={<Loading />}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell width={columnKey === "code" ? 10 : columnKey === "name" ? 300 : 100}>{renderCell(item, columnKey as keyof IBadge)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
