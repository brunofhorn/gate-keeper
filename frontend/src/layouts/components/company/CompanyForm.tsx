"use client";

import React, { useEffect, useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../../helpers/DynamicIcon';
import { maskCnpj } from '@/service/functions/maskCnpj';
import { maskPhone } from '@/service/functions/maskPhone';
import { toast } from 'react-toastify';
import { validateCnpj } from '@/service/functions/validateCnpj';
import { maskNumbers } from '@/service/functions/maskNumbers';
import { CompanyFormProps } from '@/interfaces/company';
import { Loading } from '../Loading';

const companySchema = z.object({
    cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),
    companyName: z.string().min(1, { message: "A razão social é obrigatória." }).max(60, { message: "O limite máximo de caracteres é 60." }),
    tradeName: z.string().min(1, { message: "Nome é obrigatório." }).max(70, { message: "O limite máximo de caracteres é 70." }),
    phone: z.string().min(1, { message: "O telefone é obrigatório." }).max(14, { message: "O limite máximo de caracteres é 11." }),
    floor: z.string().max(3, { message: "O limite máximo de caracteres é 3." }).optional(),
    room: z.string().max(6, { message: "O limite máximo de caracteres é 6." }).optional()
});

export type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = ({ addCompany, editCompany, setEditCompany, updateCompany }: CompanyFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const { register, control, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (editCompany) {
                const updatedCompany = { ...editCompany, ...data };

                const response = await fetch(`/api/company/${editCompany.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...updatedCompany,
                        phone: updatedCompany?.phone?.replace(/\D/g, "").toString()
                    }),
                });

                if (response.ok) {
                    toast.success("A empresa foi atualizada com sucesso.");
                    resetFields();

                    updateCompany(updatedCompany);
                    setEditCompany(null);
                } else {
                    toast.error(`Ocorreu um erro ao cadastrar a empresa. ${response.statusText}`);
                }
            } else {
                if (!validateCnpj(data.cnpj)) {
                    toast.error("O CNPJ informado não é válido.");
                    return;
                } else {
                    if (data.phone.length > 0 && data.phone.length !== 14) {
                        toast.error("O telefone está incompleto.");
                        return;
                    }

                    const response = await fetch('/api/company', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...data,
                            cnpj: data?.cnpj?.replace(/\D/g, "").toString(),
                            phone: data?.phone?.replace(/\D/g, "").toString()
                        }),
                    });

                    if (response.ok) {
                        if (response.status === 200) {
                            toast.warn("O CNPJ informado já está cadastrado.");
                        } else {
                            toast.success("A empresa foi cadastrada com sucesso.");
                            resetFields();

                            const createdCompany = await response.json();
                            addCompany(createdCompany);
                        }
                    } else {
                        toast.error(`Ocorreu um erro ao cadastrar a empresa. ${response.statusText}`);
                    }
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar a empresa. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        clearErrors();
        reset({
            cnpj: "",
            companyName: "",
            tradeName: "",
            phone: "",
            floor: "",
            room: ""
        });
    };

    const handleCancelEdit = () => {
        setEditCompany(null);
        resetFields();
    };

    useEffect(() => {
        if (editCompany) {
            reset({
                cnpj: editCompany.cnpj,
                companyName: editCompany.companyName,
                tradeName: editCompany.tradeName,
                phone: editCompany.phone,
                floor: editCompany.floor || '',
                room: editCompany.room || ''
            });
        } else {
            reset();
        }
    }, [editCompany, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-3/12">
                    <Controller
                        name={"cnpj"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskCnpj(e.target.value))}
                                placeholder="00.000.000/0000-00"
                                fullWidth
                                label="CNPJ"
                                errorMessage={errors.cnpj?.message?.toString()}
                                isInvalid={errors.cnpj?.message ? true : false}
                                isDisabled={!!editCompany}
                            />
                        )}
                    />
                </div>
                <div className="w-5/12">
                    <Input
                        {...register('companyName')}
                        fullWidth
                        label="Razão Social"
                        placeholder="Digite a razão social"
                        errorMessage={errors.companyName?.message?.toString()}
                        isInvalid={errors.companyName?.message ? true : false}
                        maxLength={60}
                        defaultValue={editCompany?.companyName ?? ""}
                    />
                </div>
                <div className="w-4/12">
                    <Input
                        {...register('tradeName')}
                        fullWidth
                        label="Nome fantasia"
                        placeholder="Digite o nome fantasia"
                        errorMessage={errors.tradeName?.message?.toString()}
                        isInvalid={errors.tradeName?.message ? true : false}
                        maxLength={70}
                        autoComplete='off'
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-1/3">
                    <Controller
                        name={"phone"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskPhone(e.target.value))}
                                placeholder="(99) 9999-9999"
                                fullWidth
                                label="Telefone"
                                errorMessage={errors.phone?.message?.toString()}
                                isInvalid={errors.phone?.message ? true : false}
                                maxLength={14}
                            />
                        )}
                    />
                </div>
                <div className="w-1/3">
                    <Controller
                        name={"floor"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskNumbers(e.target.value))}
                                fullWidth
                                label="Andar"
                                placeholder="Digite o floor"
                                errorMessage={errors.floor?.message?.toString()}
                                isInvalid={errors.floor?.message ? true : false}
                                maxLength={3}
                            />
                        )}
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        {...register('room')}
                        fullWidth
                        label="Sala"
                        placeholder="Digite a sala"
                        errorMessage={errors.room?.message?.toString()}
                        isInvalid={errors.room?.message ? true : false}
                        maxLength={6}
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
                    {editCompany && (
                        <Button type="button" onClick={handleCancelEdit} className='bg-red-900 text-white rounded-full'>
                            <DynamicIcon icon="FaXmark" />
                            Cancelar Edição
                        </Button>
                    )}
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            {editCompany ? 'Editando' : 'Cadastrando'}
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {editCompany ? 'Atualizar Empresa' : 'Cadastrar Empresa'}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CompanyForm;
