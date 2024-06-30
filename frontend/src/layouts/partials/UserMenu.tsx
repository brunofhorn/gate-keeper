"use client";

import { IUser } from "@/interfaces/user";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const UserMenu = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const userData = Cookies.get('gateKeeperUserData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar isBordered as="button" className="transition-transform" size="sm" color="primary" showFallback name='Jane' src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Ações do Perfil" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Logado como</p>
                        <p className="font-semibold">{user ? user.email : 'Carregando...'}</p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">Sair</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

export default UserMenu;