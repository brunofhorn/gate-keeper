"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Pagination } from "@nextui-org/react";
import { IUser, columns, users } from "@/service/mock/employees";
import DynamicIcon from "../helpers/DynamicIcon";

type Status = 'active' | 'paused' | 'vacation';

// Define o mapeamento com tipagem explícita
const statusColorMap: Record<Status, "success" | "danger" | "warning"> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function EmployeeList() {
    const renderCell = useCallback((user: IUser, columnKey: keyof IUser | 'actions') => {
        if (columnKey === 'actions') {
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Detalhes">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <DynamicIcon icon="FaEye" />
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar Funcionário">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <DynamicIcon icon="FaPencil" />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Deletar Funcionário">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DynamicIcon icon="FaTrash" />
                        </span>
                    </Tooltip>
                </div>
            );
        }

        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                const status = user.status as Status;
                return (
                    <Chip className="capitalize" color={statusColorMap[status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <Table
            aria-label="Example table with custom cells"
            isStriped
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IUser)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
