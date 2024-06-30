"use client";

import React, { useEffect, useState } from 'react';
import { Input, Button, Spacer, Select, SelectItem } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../../helpers/DynamicIcon';
import { IEmployee } from '@/interfaces/employee';
import { toast } from 'react-toastify';
import { Loading } from '../Loading';
import { maskCpf } from '@/service/functions/maskCpf';
import { maskDate } from '@/service/functions/maskDate';
import { maskMobile } from '@/service/functions/maskMobile';
import { validateCpf } from '@/service/functions/validateCpf';
import { validateDate } from '@/service/functions/validateDate';
import { formatDateToBrazilian } from '@/service/functions/formatDateToBrazilian';
import { VisitorFormProps } from '@/interfaces/visitor';

const visitorSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    mobile: z.string().min(1, { message: "O celular é obrigatório." }).max(16, { message: "O celular está incorreto." }),
    cpf: z.string().min(1, { message: "O CPF é obrigatório." }).max(14, { message: "O tamanho máximo do campo é 11 caracteres." }),
});

export type VisitorFormData = z.infer<typeof visitorSchema>;

const VisitorForm = ({ addVisitor, editVisitor, setEditVisitor, updateVisitor }: VisitorFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const { handleSubmit, control, clearErrors, reset, setValue, setError, setFocus, formState: { errors, isSubmitSuccessful } } = useForm<VisitorFormData>({
        resolver: zodResolver(visitorSchema),
        defaultValues: {
            name: "",
            cpf: "",
            mobile: "",
        }
    });

    const onSubmit: SubmitHandler<VisitorFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (editVisitor) {
                if (!validateCpf(data.cpf)) {
                    setError("cpf", { message: "CPF inválido.", type: "validate" });
                    setFocus("cpf");
                    return;
                }

                const response = await fetch(`/api/visitor/${editVisitor.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            ...editVisitor,
                            ...data,
                            cpf: data?.cpf?.replace(/\D/g, "").toString(),
                            mobile: data?.mobile?.replace(/\D/g, "").toString()
                        }
                    ),
                });

                if (response.ok) {
                    toast.success("O visitante foi atualizado com sucesso.");
                    resetFields();

                    const updatedVisitor = await response.json();

                    updateVisitor(updatedVisitor);
                    setEditVisitor(null);
                } else {
                    toast.error(response.statusText);
                }
            } else {
                if (!validateCpf(data.cpf)) {
                    setError("cpf", { message: "CPF inválido.", type: "validate" });
                    setFocus("cpf");
                    return;
                }

                const response = await fetch('/api/visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
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
                        toast.success("O visitante foi cadastrado com sucesso.");

                        const createdVisitor = await response.json();
                        addVisitor(createdVisitor);
                    }
                } else {
                    toast.error(response.statusText);
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar o visitante. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        reset({
            name: "",
            cpf: "",
            mobile: "",
        });
        clearErrors();
    };

    useEffect(() => {
        reset({
            name: "",
            cpf: "",
            mobile: "",
        });

        clearErrors();
    }, [isSubmitSuccessful]);

    const handleCancelEdit = () => {
        setEditVisitor(null);
        resetFields();
    };

    useEffect(() => {
        if (editVisitor) {
            setValue("name", editVisitor.name);
            setValue("cpf", maskCpf(editVisitor.cpf));
            setValue("mobile", maskMobile(editVisitor.mobile));
        } else {
            reset();
        }
    }, [editVisitor, reset, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-4/6">
                    <Controller
                        name={"name"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="Nome"
                                placeholder="Digite o nome do visitante"
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
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="w-2/3 flex flex-row gap-2">
                    <Button type="button" onClick={resetFields} className='bg-red-500 text-white rounded-full'>
                        <DynamicIcon icon="FaEraser" />
                        Limpar
                    </Button>
                    {editVisitor && (
                        <Button type="button" onClick={handleCancelEdit} className='bg-red-900 text-white rounded-full'>
                            <DynamicIcon icon="FaXmark" />
                            Cancelar Edição
                        </Button>
                    )}
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            {editVisitor ? 'Editando' : 'Cadastrando'}
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {editVisitor ? 'Atualizar Visitante' : 'Cadastrar Visitante'}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default VisitorForm;
