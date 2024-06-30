"use client";

import React, { useEffect, useState } from 'react';
import { Input, Button, Spacer, DateInput } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../../helpers/DynamicIcon';
import { EmployeeFormProps } from '@/interfaces/employee';
import { ICompany } from '@/interfaces/company';
import { toast } from 'react-toastify';
import { Loading } from '../Loading';
import { maskCpf } from '@/service/functions/maskCpf';
import { CalendarDate, parseDate } from '@internationalized/date';

const employeeSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    birthDate: z.string().min(1, { message: "A data de nascimento é obrigatória." }),
    company: z.string().min(1, { message: 'A empresa é obrigatória.' }),
    role: z.string().min(1, { message: "O cargo é obrigatório." }),
    department: z.string().min(1, { message: "O setor é obrigatório." }),
    mobile: z.string().min(1, { message: "O celular é obrigatório." }),
    cpf: z.string().min(1, { message: "O CPF é obrigatório." })
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeForm = ({ addEmployee, editEmployee, setEditEmployee, updateEmployee }: EmployeeFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companies, setCompanies] = useState<ICompany[]>();
    const { handleSubmit, control, clearErrors, reset, setValue, formState: { errors, isSubmitSuccessful } } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: "",
            cpf: "",
            birthDate: undefined,
            company: "",
            department: "",
            mobile: "",
            role: "",
        }
    });

    useEffect(() => {
        setLoadingCompanies(true);

        const fetchCompanies = async () => {
            try {
                const response = await fetch("/api/company");
                if (response.ok) {
                    const data: ICompany[] = await response.json();

                    setCompanies(data);
                    setLoadingCompanies(false);
                } else {
                    console.error("Erro ao buscar as empresas:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
            }
        };

        fetchCompanies();
    }, []);

    const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (editEmployee) {
                const updatedEmployee = { ...editEmployee, ...data };

                const response = await fetch(`/api/employee/${updatedEmployee.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedEmployee),
                });

                if (response.ok) {
                    toast.success("O funcionário foi atualizado com sucesso.");
                    resetFields();

                    const updatedEmployee = await response.json();

                    updateEmployee(updatedEmployee);
                    setEditEmployee(null);
                } else {
                    toast.error(response.statusText);
                }
            } else {
                const response = await fetch('/api/employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    toast.success("O funcionário foi cadastrado com sucesso.");

                    const createdEmployee = await response.json();
                    addEmployee(createdEmployee);
                } else {
                    toast.error(response.statusText);
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar o funcionário. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        reset({
            name: "",
            birthDate: undefined,
            cpf: "",
            company: undefined,
            department: "",
            mobile: "",
            role: ""
        });
        clearErrors();
    };

    useEffect(() => {
        reset({
            name: "",
            birthDate: undefined,
            cpf: "",
            company: undefined,
            department: "",
            mobile: "",
            role: ""
        });

        setValue("company", "");

        clearErrors();
    }, [isSubmitSuccessful]);

    const handleCancelEdit = () => {
        setEditEmployee(null);
        resetFields();
    };

    useEffect(() => {
        if (editEmployee) {
            setValue("name", editEmployee.name);
            setValue("birthDate", editEmployee.birthDate);
            setValue("company", editEmployee.company.id);
            setValue("cpf", editEmployee.cpf);
            setValue("department", editEmployee.department);
            setValue("mobile", editEmployee.mobile);
            setValue("role", editEmployee.role);
        } else {
            reset();
        }
    }, [editEmployee, reset, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-3/6">
                    <Controller
                        name={"name"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="Nome"
                                placeholder="Digite o nome do funcionário"
                                errorMessage={errors.name?.message?.toString()}
                                isInvalid={errors.name?.message ? true : false}
                                maxLength={30}
                            />
                        )}
                    />
                </div>
                <div className="w-1/6">
                    <Controller
                        name={"cpf"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskCpf(e.target.value))}
                                placeholder="000.000.000-00"
                                fullWidth
                                label="CPF"
                                maxLength={14}
                                errorMessage={errors.cpf?.message?.toString()}
                                isInvalid={errors.cpf?.message ? true : false}
                            />
                        )}
                    />
                </div>
                <div className="w-2/6">
                    <Controller
                        name={"birthDate"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <DateInput
                                fullWidth
                                placeholderValue={new CalendarDate(2024, 30, 6)}
                                label="Data de Nascimento"
                                errorMessage={errors.birthDate?.message?.toString()}
                                isInvalid={errors.birthDate?.message ? true : false}
                            />
                        )}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="w-2/3 flex flex-row gap-2">
                    <Button type="button" onClick={resetFields} className='bg-red-500 text-white rounded-full'>
                        <DynamicIcon icon="FaEraser" />
                        Limpar
                    </Button>
                    {editEmployee && (
                        <Button type="button" onClick={handleCancelEdit} className='bg-red-900 text-white rounded-full'>
                            <DynamicIcon icon="FaXmark" />
                            Cancelar Edição
                        </Button>
                    )}
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            {editEmployee ? 'Editando' : 'Cadastrando'}
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {editEmployee ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default EmployeeForm;
