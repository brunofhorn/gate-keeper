"use client";

import PageTitle from "@/layouts/partials/PageTitle";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Loading } from "@/layouts/components/Loading";

export default function Logout() {
    const { push } = useRouter();

    useEffect(() => {
        Cookies.remove('gateKeeperUserData');

        push("/");
    }, []);

    return (
        <>
            <PageTitle title="Sair" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <div className="flex w-full h-full justify-center items-center text-white">
                    <div className="flex flex-row items-center gap-2">
                        <Loading />
                        <span className="text-white text-2xl">Saindo...</span>
                    </div>
                </div>
            </div>
        </>
    );
}