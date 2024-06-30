"use client";

import React, { useEffect, useState } from 'react';
import { Input, Button, Spacer, Select, SelectItem } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../../helpers/DynamicIcon';
import { EmployeeFormProps } from '@/interfaces/employee';
import { ICompany } from '@/interfaces/company';
import { toast } from 'react-toastify';
import { Loading } from '../Loading';
import { maskCpf } from '@/service/functions/maskCpf';
import { maskDate } from '@/service/functions/maskDate';
import { maskMobile } from '@/service/functions/maskMobile';
import { maskCnpj } from '@/service/functions/maskCnpj';
import { validateCpf } from '@/service/functions/validateCpf';
import { validateDate } from '@/service/functions/validateDate';
import { formatDateToBrazilian } from '@/service/functions/formatDateToBrazilian';

const employeeSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    birthDate: z.string().min(1, { message: "A data de nascimento é obrigatória." }),
    company: z.string().min(1, { message: 'A empresa é obrigatória.' }),
    role: z.string().min(1, { message: "O cargo é obrigatório." }).max(30, { message: "O tamanho máximo do campo é 30 caracteres." }),
    department: z.string().min(1, { message: "O setor é obrigatório." }).max(50, { message: "O tamanho máximo do campo é 50 caracteres." }),
    mobile: z.string().min(1, { message: "O celular é obrigatório." }).max(16, { message: "O celular está incorreto." }),
    email: z.string().min(1, { message: "O e-mail é obrigatório." }).max(80, { message: "O tamanho máximo do campo é 80 caracteres." }),
    cpf: z.string().min(1, { message: "O CPF é obrigatório." }).max(14, { message: "O tamanho máximo do campo é 11 caracteres." })
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeForm = ({ addEmployee, editEmployee, setEditEmployee, updateEmployee }: EmployeeFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const { handleSubmit, control, clearErrors, reset, setValue, setError, setFocus, formState: { errors, isSubmitSuccessful } } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: "",
            cpf: "",
            birthDate: "",
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
                    const data = await response.json();
                    setCompanies(data);
                    setLoadingCompanies(false);
                } else {
                    console.error("Erro ao buscar empresas:", response.status);
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
                if (!validateCpf(data.cpf)) {
                    setError("cpf", { message: "CPF inválido.", type: "validate" });
                    setFocus("cpf");
                    return;
                }

                const correctDate = validateDate(data.birthDate);

                if (!correctDate) {
                    setError("birthDate", { message: "Data de nascimento inválida.", type: "validate" });
                    setFocus("birthDate");
                    return;
                }

                const response = await fetch(`/api/employee/${editEmployee.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            ...editEmployee,
                            ...data,
                            birthDate: correctDate,
                            cpf: data?.cpf?.replace(/\D/g, "").toString(),
                            mobile: data?.mobile?.replace(/\D/g, "").toString()
                        }
                    ),
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
                if (!validateCpf(data.cpf)) {
                    setError("cpf", { message: "CPF inválido.", type: "validate" });
                    setFocus("cpf");
                    return;
                }

                const correctDate = validateDate(data.birthDate);

                if (!correctDate) {
                    setError("birthDate", { message: "Data de nascimento inválida.", type: "validate" });
                    setFocus("birthDate");
                    return;
                }

                const response = await fetch('/api/employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        birthDate: correctDate,
                        cpf: data?.cpf?.replace(/\D/g, "").toString(),
                        mobile: data?.mobile?.replace(/\D/g, "").toString()
                    }),
                });

                if (response.ok) {
                    if (response.status === 200) {
                        toast.warn("O CPF informado já está cadastrado.");
                        setError("cpf", { message: "CPF já existe.", type: "validate" });
                        setFocus("cpf");
                    } else {
                        toast.success("O funcionário foi cadastrado com sucesso.");

                        const createdEmployee = await response.json();
                        addEmployee(createdEmployee);
                    }
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
            birthDate: "",
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
            setValue("birthDate", formatDateToBrazilian(editEmployee.birthDate));
            setValue("company", editEmployee.company.id);
            setValue("cpf", maskCpf(editEmployee.cpf));
            setValue("department", editEmployee.department);
            setValue("mobile", maskMobile(editEmployee.mobile));
            setValue("role", editEmployee.role);
            setValue("email", editEmployee.email);
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
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskDate(e.target.value))}
                                placeholder="dd/mm/aaaa"
                                fullWidth
                                label="Data de Nascimento"
                                errorMessage={errors.birthDate?.message?.toString()}
                                isInvalid={errors.birthDate?.message ? true : false}
                            />
                        )}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-1/6">
                    <Controller
                        name={"mobile"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskMobile(e.target.value))}
                                placeholder="(99) 9 9999-9999"
                                fullWidth
                                label="Celular"
                                errorMessage={errors.mobile?.message?.toString()}
                                isInvalid={errors.mobile?.message ? true : false}
                            />
                        )}
                    />
                </div>
                <div className="w-2/6">
                    <Controller
                        name={"email"}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="E-mail"
                                placeholder="Digite o e-mail do funcionário"
                                errorMessage={errors.email?.message?.toString()}
                                isInvalid={errors.email?.message ? true : false}
                                maxLength={80}
                            />
                        )}
                    />
                </div>
                <div className="w-3/6">
                    <Controller
                        name={"company"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isLoading={loadingCompanies}
                                items={companies}
                                label="Empresa"
                                placeholder="Selecione a empresa"
                                errorMessage={errors.company?.message?.toString()}
                                isInvalid={errors.company?.message ? true : false}
                                selectedKeys={field.value ? [field.value] : undefined}
                                renderValue={(items) => {
                                    return items.map((item) => (
                                        <div key={item.key}>
                                            {item.textValue}
                                        </div>
                                    ));
                                }}
                            >
                                {(company) => <SelectItem key={company.id} value={company.id} textValue={`${company.tradeName} (${maskCnpj(company.cnpj)})`}>{company.tradeName} ({maskCnpj(company.cnpj)})</SelectItem>}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-2/6">
                    <Controller
                        name={"department"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="Departamento"
                                placeholder="Digite o departamento do funcionário"
                                errorMessage={errors.department?.message?.toString()}
                                isInvalid={errors.department?.message ? true : false}
                                maxLength={50}
                            />
                        )}
                    />
                </div>
                <div className="w-2/6">
                    <Controller
                        name={"role"}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="Cargo"
                                placeholder="Digite o cargo do funcionário"
                                errorMessage={errors.role?.message?.toString()}
                                isInvalid={errors.role?.message ? true : false}
                                maxLength={30}
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
