import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cadastro - Gate Keeper",
    description: "Sistema Automatizado de Controle de Acesso",
};

export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children;
}
