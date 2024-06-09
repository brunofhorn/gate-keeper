import EmployeeForm from "@/layouts/components/EmployeeForm";
import EmployeeList from "@/layouts/components/EmployeeList";
import { Spacer } from "@nextui-org/react";

export default function Employees() {
    return (
        <>
            <div>
                <EmployeeForm />
            </div>
            <Spacer y={4} />
            <div>
                <EmployeeList />
            </div>
        </>
    );
}