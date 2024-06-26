"use client";

import Link from "next/link";
import DynamicIcon from "../helpers/DynamicIcon";
import { usePathname } from "next/navigation";

interface IMenuProps {
    menu: IMenu[];
}

interface IMenu {
    id: number,
    name: string,
    icon: string,
    href: string;
}

const Menu = ({ menu: menus }: IMenuProps) => {
    const path = usePathname();

    return (
        <>
            {menus.map(((m, i) => (
                <Link
                    key={i}
                    href={m.href}
                    className={`flex flex-row gap-3 items-center ${path === m.href ? "bg-secondary hover:bg-secondary/75" : "bg-tertiary"} hover:bg-secondary px-3 py-2 rounded-3xl text-white text-sm my-1`}>
                    <DynamicIcon className="inline-block" icon={m.icon} />
                    <span>{m.name}</span>
                </Link>
            )))}
        </>
    );
};

export default Menu;