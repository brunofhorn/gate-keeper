import Header from "@/layouts/partials/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Gate Keeper",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header />
            <div id="main">
                <div id="side-menu"></div>
                <div id="main-content">
                    {children}
                </div>
            </div>
        </>
    );
}
