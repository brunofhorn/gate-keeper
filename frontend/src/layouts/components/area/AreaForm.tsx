"use client";

import { AreaFormProps } from "@/interfaces/area";
import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spacer, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "../Loading";
import { ICompany } from "@/interfaces/company";
import { toast } from "react-toastify";

const areaSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).max(60, { message: "O limite máximo de caracteres é 60." }),
    description: z.string().min(1, { message: "A descrição é obrigatória." }).max(200, { message: "O limite máximo de caracteres é 200." }),
    company: z.string().min(1, { message: "A empresa é obrigatória." }),
});

export type AreaFormData = z.infer<typeof areaSchema>;

const AreaForm = ({ addArea, editArea, setEditArea, updateArea }: AreaFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const { handleSubmit, control, clearErrors, reset, setValue, formState: { errors, isSubmitSuccessful } } = useForm<AreaFormData>({
        resolver: zodResolver(areaSchema),
        defaultValues: {
            name: "",
            description: "",
            company: ""
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
                    console.error("Erro ao buscar companies:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    const onSubmit: SubmitHandler<AreaFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (editArea) {
                const updatedArea = { ...editArea, ...data };

                const response = await fetch(`/api/area/${editArea.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedArea),
                });

                if (response.ok) {
                    toast.success("A área foi atualizada com sucesso.");
                    resetFields();

                    const updatedArea = await response.json();

                    updateArea(updatedArea);
                    setEditArea(null);
                } else {
                    toast.error(response.statusText);
                }
            } else {
                const response = await fetch('/api/area', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    toast.success("A área foi cadastrada com sucesso.");

                    const createdArea = await response.json();
                    addArea(createdArea);
                } else {
                    toast.error(response.statusText);
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar a área. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        reset({
            name: "",
            company: "",
            description: undefined
        });
        clearErrors();
    };

    useEffect(() => {
        reset({
            name: "",
            description: "",
            company: undefined
        });

        clearErrors();
    }, [isSubmitSuccessful]);

    const handleCancelEdit = () => {
        setEditArea(null);
        resetFields();
    };

    useEffect(() => {
        if (editArea) {
            setValue("name", editArea.name);
            setValue("description", editArea.description);
            setValue("company", editArea.companyId);
        } else {
            reset();
        }
    }, [editArea, reset, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-6/12">
                    <Controller
                        name={"name"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="Nome"
                                placeholder="Digite o nome da área"
                                errorMessage={errors.name?.message?.toString()}
                                isInvalid={errors.name?.message ? true : false}
                                maxLength={30}
                            />
                        )}
                    />
                </div>
                <div className="w-6/12">
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
                                {(company) => <SelectItem key={company.id} value={company.id} textValue={editArea?.companyTradeName ?? company.tradeName}>{company.tradeName}</SelectItem>}
                            </Select>
                        )}
                    />
                </div>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <Controller
                        name={"description"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                fullWidth
                                label="Descrição"
                                placeholder="Digite a descrição da área"
                                errorMessage={errors.description?.message?.toString()}
                                isInvalid={errors.description?.message ? true : false}
                                maxLength={200}
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
                    {editArea && (
                        <Button type="button" onClick={handleCancelEdit} className='bg-red-900 text-white rounded-full'>
                            <DynamicIcon icon="FaXmark" />
                            Cancelar Edição
                        </Button>
                    )}
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            {editArea ? 'Editando' : 'Cadastrando'}
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {editArea ? 'Atualizar Área' : 'Cadastrar Área'}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default AreaForm;