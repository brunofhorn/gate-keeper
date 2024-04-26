import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Esqueceu sua Senha - Gate Keeper",
    description: "Sistema Automatizado de Controle de Acesso",
};

export default function ForgetPasswordLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children;
}
