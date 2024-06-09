"use client";

import React from 'react';
import { Input, Button, Spacer, Select, SelectItem, DatePicker } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { companies } from '@/service/mock/companies';
import DynamicIcon from '../helpers/DynamicIcon';

const employeeSchema = z.object({
    matricula: z.string().nonempty({ message: "Matrícula é obrigatória" }),
    nome: z.string().nonempty({ message: "Nome é obrigatório" }),
    dataNascimento: z.date({ required_error: "Data de nascimento é obrigatória" }),
    empresa: z.string().nonempty({ message: 'Empresa é obrigatória' }),
    cargo: z.string().nonempty({ message: "Cargo é obrigatório" }),
    setor: z.string().nonempty({ message: "Setor é obrigatório" }),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeForm = () => {
    const { register, control, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
    });

    const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
        console.log(data);
    };

    const resetFields = () => {
        clearErrors();
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-1/6">
                    <Input
                        {...register('matricula')}
                        fullWidth
                        label="Matrícula"
                        placeholder="Digite a matrícula"
                        errorMessage={errors.matricula?.message?.toString()}
                        isInvalid={errors.matricula?.message ? true : false}
                    />
                </div>
                <div className="w-5/6">
                    <Input
                        {...register('nome')}
                        fullWidth
                        label="Nome"
                        placeholder="Digite o nome"
                        errorMessage={errors.nome?.message?.toString()}
                        isInvalid={errors.nome?.message ? true : false}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-1/3">
                    <Controller
                        name="dataNascimento"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                onChange={(date) => field.onChange(date)}
                                label="Data de Nascimento"
                                translate='yes'
                                errorMessage={errors.dataNascimento?.message?.toString()}
                                isInvalid={errors.dataNascimento?.message ? true : false}
                            />
                        )}
                    />
                </div>
                <div className="w-1/3">
                    <Select
                        {...register('empresa')}
                        label="Empresa"
                        placeholder="Selecione a Empresa"
                        errorMessage={errors.dataNascimento?.message?.toString()}
                        isInvalid={errors.dataNascimento?.message ? true : false}
                    >
                        {companies.map((company) => (
                            <SelectItem key={company.id}>
                                {company.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Input
                        {...register('cargo')}
                        fullWidth
                        label="Cargo / Função"
                        placeholder="Digite o cargo/função"
                        errorMessage={errors.cargo?.message?.toString()}
                        isInvalid={errors.cargo?.message ? true : false}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="w-1/3">
                    <Input
                        {...register('setor')}
                        fullWidth
                        label="Setor"
                        placeholder="Digite o setor"
                        errorMessage={errors.setor?.message?.toString()}
                        isInvalid={errors.setor?.message ? true : false}
                    />
                </div>
                <div className="w-2/3 flex flex-row gap-2">
                    <Button type="button" onClick={resetFields} className='bg-red-500 text-white rounded-full'>
                        <DynamicIcon icon="FaEraser" />
                        Limpar
                    </Button>
                    <Button type="submit" className='bg-primary text-white rounded-full'>
                        <DynamicIcon icon="FaCheck" />
                        Cadastrar Funcionário
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default EmployeeForm;
