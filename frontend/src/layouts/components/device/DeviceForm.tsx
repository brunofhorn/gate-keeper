"use client";

import DynamicIcon from "@/layouts/helpers/DynamicIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, SelectSection, Spacer, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "../Loading";
import { toast } from "react-toastify";
import { DeviceFormProps } from "@/interfaces/device";
import { IArea } from "@/interfaces/area";

const deviceSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).max(60, { message: "O limite máximo de caracteres é 60." }),
    description: z.string().min(1, { message: "A descrição é obrigatória." }).max(200, { message: "O limite máximo de caracteres é 200." }),
    ip: z.string().min(1, { message: "O IP é obrigatório." }),
    area: z.string().min(1, { message: "A área é obrigatória." }),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;

const DeviceForm = ({ addDevice, editDevice, setEditDevice, updateDevice }: DeviceFormProps) => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingAreas, setLoadingAreas] = useState<boolean>(true);
    const [areas, setAreas] = useState<{ [key: string]: IArea[]; }>({});
    const { handleSubmit, control, clearErrors, reset, setValue, formState: { errors, isSubmitSuccessful } } = useForm<DeviceFormData>({
        resolver: zodResolver(deviceSchema),
        defaultValues: {
            name: "",
            description: "",
            ip: "",
            area: ""
        }
    });

    const groupBy = <T,>(array: T[], key: keyof T): { [key: string]: T[]; } => {
        return array.reduce((result, currentValue) => {
            const groupKey = currentValue[key] as unknown as string;
            (result[groupKey] = result[groupKey] || []).push(currentValue);
            return result;
        }, {} as { [key: string]: T[]; });
    };

    useEffect(() => {
        setLoadingAreas(true);

        const fetchAreas = async () => {
            try {
                const response = await fetch("/api/area");
                if (response.ok) {
                    const data: IArea[] = await response.json();

                    const groupedAreas = groupBy(data, 'companyTradeName');

                    setAreas(groupedAreas);
                    setLoadingAreas(false);
                } else {
                    console.error("Erro ao buscar áreas:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar áreas:", error);
            }
        };

        fetchAreas();
    }, []);

    const onSubmit: SubmitHandler<DeviceFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (editDevice) {
                const updatedDevice = { ...editDevice, ...data };

                const response = await fetch(`/api/device/${editDevice.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedDevice),
                });

                if (response.ok) {
                    toast.success("O dispositivo foi atualizado com sucesso.");
                    resetFields();

                    const updatedDevice = await response.json();

                    updateDevice(updatedDevice);
                    setEditDevice(null);
                } else {
                    toast.error(response.statusText);
                }
            } else {
                const response = await fetch('/api/device', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    toast.success("O dispositivo foi cadastrado com sucesso.");

                    const createdDevice = await response.json();
                    addDevice(createdDevice);
                } else {
                    toast.error(response.statusText);
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar o dispositivo. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        reset({
            name: "",
            description: "",
            ip: "",
            area: undefined
        });
        clearErrors();
    };

    useEffect(() => {
        reset({
            name: "",
            description: "",
            ip: "",
            area: undefined
        });

        setValue("area", "");

        clearErrors();
    }, [isSubmitSuccessful]);

    const handleCancelEdit = () => {
        setEditDevice(null);
        resetFields();
    };

    useEffect(() => {
        if (editDevice) {
            setValue("name", editDevice.name);
            setValue("description", editDevice.description);
            setValue("ip", editDevice.ip);
            setValue("area", editDevice.belongsArea.id);
        } else {
            reset();
        }
    }, [editDevice, reset, setValue]);

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
                                placeholder="Digite o nome do dispositivo"
                                errorMessage={errors.name?.message?.toString()}
                                isInvalid={errors.name?.message ? true : false}
                                maxLength={30}
                            />
                        )}
                    />
                </div>
                <div className="w-6/12">
                    <Controller
                        name={"ip"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Input
                                {...field}
                                fullWidth
                                label="IP"
                                placeholder="Digite o IP do dispositivo"
                                errorMessage={errors.ip?.message?.toString()}
                                isInvalid={errors.ip?.message ? true : false}
                                maxLength={30}
                            />
                        )}
                    />
                </div>
                <div className="w-6/12">
                    <Controller
                        name={"area"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field }) => (
                            <Select
                                {...field}
                                isLoading={loadingAreas}
                                label="Área"
                                placeholder="Selecione a área"
                                errorMessage={errors.area?.message?.toString()}
                                isInvalid={errors.area?.message ? true : false}
                                selectedKeys={field.value ? [field.value] : undefined}
                                renderValue={(items) => items.map((item) => <div key={item.key}>{item.textValue}</div>)}
                            >
                                {Object.keys(areas).map((companyTradeName) => (
                                    <SelectSection key={companyTradeName} showDivider title={companyTradeName}>
                                        {areas[companyTradeName].map((area) => (
                                            <SelectItem key={area.id} value={area.id} textValue={`${area.companyTradeName} - ${area.name}`}>
                                                {area.name}
                                            </SelectItem>
                                        ))}
                                    </SelectSection>
                                ))}
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
                                placeholder="Digite a descrição do dispositivo"
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
                    {editDevice && (
                        <Button type="button" onClick={handleCancelEdit} className='bg-red-900 text-white rounded-full'>
                            <DynamicIcon icon="FaXmark" />
                            Cancelar Edição
                        </Button>
                    )}
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            {editDevice ? 'Editando' : 'Cadastrando'}
                        </Button>
                    ) : (
                        <Button type={"submit"} className={`bg-primary text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {editDevice ? 'Atualizar Dispositivo' : 'Cadastrar Dispositivo'}
                        </Button>
                    )}
                </div>
            </div>
        </form >
    );
};

export default DeviceForm;