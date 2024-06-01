import Header from "@/layouts/partials/Header";
import SidebarMenu from "@/layouts/partials/SidebarMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Gate Keeper",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header />
            <div id="main" className="flex flex-row w-full bg-secondary">
                <SidebarMenu />
                <div id="main-content" className="w-full">
                    <div className="px-10">
                        BREADCRUMB
                    </div>
                    <div className="bg-black max-h-full h-full px-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
