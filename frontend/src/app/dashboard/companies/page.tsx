import CompanyForm from "@/layouts/components/CompanyForm";
import CompanyList from "@/layouts/components/CompanyList";
import PageTitle from "@/layouts/partials/PageTitle";
import { Spacer } from "@nextui-org/react";

export default function Companies() {
    return (
        <>
            <PageTitle title="Empresas" />
            <div className="bg-black h-screen p-10 pb-44 overflow-y-auto">
                <div>
                    <CompanyForm />
                </div>
                <Spacer y={8} />
                <div>
                    <CompanyList />
                </div>
            </div>
        </>
    );
}