import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Gate Keeper",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children;
}
