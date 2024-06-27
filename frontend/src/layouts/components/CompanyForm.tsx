"use client";

import React, { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../helpers/DynamicIcon';
import { maskCnpj } from '@/service/functions/maskCnpj';
import { maskPhone } from '@/service/functions/maskPhone';
import { toast } from 'react-toastify';
import { validateCnpj } from '@/service/functions/validateCnpj';
import { maskNumbers } from '@/service/functions/maskNumbers';

const companySchema = z.object({
    cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),
    razaoSocial: z.string().min(1, { message: "A razão social é obrigatória" }).max(60, { message: "O limite máximo de caracteres é 60." }),
    nomeFantasia: z.string().min(1, { message: "Nome é obrigatório" }).max(70, { message: "O limite máximo de caracteres é 70." }),
    telefone: z.string().min(1, { message: "O telefone é obrigatório." }).max(14, { message: "O limite máximo de caracteres é 11." }),
    andar: z.string().max(3, { message: "O limite máximo de caracteres é 3." }).optional(),
    sala: z.string().max(6, { message: "O limite máximo de caracteres é 6" }).optional()
});

export type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = () => {
    const [registerLoading, setRegisterLoading] = useState<boolean>(false);
    const { register, control, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
        setRegisterLoading(true);

        try {
            if (!validateCnpj(data.cnpj)) {
                toast.error("O CNPJ informado não é válido.");
            } else {
                const response = await fetch('/api/company', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    if (response.status === 200) {
                        toast.warn("O CNPJ informado já está cadastrado.");
                    } else {
                        toast.success("A empresa foi cadastrada com sucesso.");
                        resetFields();
                    }
                } else {
                    toast.error(`Ocorreu um erro ao cadastrar a empresa. ${response.statusText}`);
                }
            }

        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar a empresa. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setRegisterLoading(false);
        }
    };

    const resetFields = () => {
        clearErrors();
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-1/6">
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
                            />
                        )}
                    />
                </div>
                <div className="w-3/6">
                    <Input
                        {...register('razaoSocial')}
                        fullWidth
                        label="Razão Social"
                        placeholder="Digite a razão social"
                        errorMessage={errors.razaoSocial?.message?.toString()}
                        isInvalid={errors.razaoSocial?.message ? true : false}
                        maxLength={60}
                    />
                </div>
                <div className="w-2/6">
                    <Input
                        {...register('nomeFantasia')}
                        fullWidth
                        label="Nome fantasia"
                        placeholder="Digite o nome fantasia"
                        errorMessage={errors.nomeFantasia?.message?.toString()}
                        isInvalid={errors.nomeFantasia?.message ? true : false}
                        maxLength={70}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-1/3">
                    <Controller
                        name={"telefone"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskPhone(e.target.value))}
                                placeholder="(99) 9999-9999"
                                fullWidth
                                label="Telefone"
                                errorMessage={errors.telefone?.message?.toString()}
                                isInvalid={errors.telefone?.message ? true : false}
                                maxLength={14}
                            />
                        )}
                    />
                </div>
                <div className="w-1/3">
                    <Controller
                        name={"andar"}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(maskNumbers(e.target.value))}
                                fullWidth
                                label="Andar"
                                placeholder="Digite o andar"
                                errorMessage={errors.andar?.message?.toString()}
                                isInvalid={errors.andar?.message ? true : false}
                                maxLength={3}
                            />
                        )}
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        {...register('sala')}
                        fullWidth
                        label="Sala"
                        placeholder="Digite a sala"
                        errorMessage={errors.sala?.message?.toString()}
                        isInvalid={errors.sala?.message ? true : false}
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
                    {registerLoading ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <DynamicIcon icon="FaSpinner" />
                            Cadastrando
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            Cadastrar Empresa
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CompanyForm;
