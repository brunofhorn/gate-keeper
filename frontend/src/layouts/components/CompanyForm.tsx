"use client";

import React from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import DynamicIcon from '../helpers/DynamicIcon';

const companySchema = z.object({
    cnpj: z.string().min(1, { message: "O CNPJ é obrigatório." }),
    razaoSocial: z.string().min(1, { message: "A razão social é obrigatória" }),
    nomeFantasia: z.string().min(1, { message: "Nome é obrigatório" }),
    telefone: z.string().min(1, { message: "O telefone é obrigatório." }),
    andar: z.number().optional(),
    sala: z.string().optional()
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = () => {
    const { register, control, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    const onSubmit: SubmitHandler<CompanyFormData> = (data) => {
        console.log(data);
    };

    const resetFields = () => {
        clearErrors();
        reset();
    };

    const formatCNPJ = (value: string) => {
        value = value.replace(/\D/g, '');

        if (value.length > 12) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
        } else if (value.length > 8) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4}).*/, '$1.$2.$3/$4');
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{3})(\d{3}).*/, '$1.$2.$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{3}).*/, '$1.$2');
        }

        return value;
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
                                onChange={(e) => onChange(formatCNPJ(e.target.value))}
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
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-1/3">
                    <Input
                        {...register('telefone')}
                        fullWidth
                        label="Telefone"
                        placeholder="Digite o telefone"
                        errorMessage={errors.telefone?.message?.toString()}
                        isInvalid={errors.telefone?.message ? true : false}
                    />
                </div>
                <div className="w-1/3">
                    <Input
                        {...register('andar')}
                        fullWidth
                        label="Andar"
                        placeholder="Digite o andar"
                        errorMessage={errors.andar?.message?.toString()}
                        isInvalid={errors.andar?.message ? true : false}
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
                    <Button type="submit" className='bg-primary text-white rounded-full'>
                        <DynamicIcon icon="FaCheck" />
                        Cadastrar Empresa
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CompanyForm;
