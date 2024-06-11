import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Gate Keeper",
    description: "Sistema Automatizado de Controle de Acesso",
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children;
}
