"use client";

import React, { useEffect, useState } from 'react';
import { Button, Spacer, Select, SelectItem, Input, Tooltip, SelectSection, Chip } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicIcon from '../../helpers/DynamicIcon';
import { Loading } from '../Loading';
import { toast } from 'react-toastify';
import { generateRandomCode } from '@/service/functions/generateRandomCode';
import { IEmployee } from '@/interfaces/employee';
import { BadgeFormProps } from '@/interfaces/badge';
import { IArea } from '@/interfaces/area';
import { IVisitor } from '@/interfaces/visitor';
import { maskCpf } from '@/service/functions/maskCpf';
import { maskDate } from '@/service/functions/maskDate';
import { validateDate } from '@/service/functions/validateDate';
import { formatDateToBrazilian } from '@/service/functions/formatDateToBrazilian';

const badgeSchema = z.object({
    type: z.string().min(1, { message: "O tipo é obrigatório." }),
    code: z.string().min(1, { message: "O código do crachá é obrigatório" }),
    employee: z.string().min(1, { message: "O funcionário é obrigatório." }),
    visitor: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    observations: z.string().optional(),
    permissions: z.string().min(1, { message: "As permissões do crachá são obrigatórias." })
});

export type BadgeFormData = z.infer<typeof badgeSchema>;

const BadgeForm = ({ addBadge }: BadgeFormProps) => {
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [loadingCode, setLoadingCode] = useState<boolean>(false);
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [loadingEmployees, setLoadingEmployees] = useState<boolean>(false);
    const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
    const [loadingVisitors, setLoadingVisitors] = useState<boolean>(false);
    const [showEmployeeInputs, setShowEmployeeInputs] = useState<boolean>(false);
    const [showVisitorInputs, setShowVisitorInputs] = useState<boolean>(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [visitors, setVisitors] = useState<IVisitor[]>([]);
    const [areas, setAreas] = useState<{ [key: string]: IArea[]; }>({});
    const { handleSubmit, control, clearErrors, reset, setValue, getValues, setError, setFocus, formState: { errors, isSubmitSuccessful } } = useForm<BadgeFormData>({
        resolver: zodResolver(badgeSchema),
        defaultValues: {
            code: "",
            employee: undefined,
            startDate: formatDateToBrazilian(new Date().toLocaleDateString("en-CA")),
            endDate: formatDateToBrazilian(new Date().toLocaleDateString("en-CA")),
            observations: "",
            permissions: undefined,
            type: undefined,
            visitor: undefined
        }
    });

    const badgeTypes = [{ key: "FIXED", label: "Funcionário" }, { key: "TEMPORARY", label: "Visitante" }];

    const onSubmit: SubmitHandler<BadgeFormData> = async (data) => {
        setLoadingForm(true);

        try {
            if (data.type === "FIXED") {
                const response = await fetch('/api/badge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    toast.success("O crachá foi cadastrado com sucesso.");

                    const createdBadge = await response.json();
                    addBadge(createdBadge);
                } else {
                    toast.error(response.statusText);
                }
            } else {
                const correctStartDate = validateDate(data?.startDate ?? "");

                if (!correctStartDate) {
                    setError("startDate", { message: "Data inicial da visita.", type: "validate" });
                    setFocus("startDate");
                    return;
                }

                const correctEndDate = validateDate(data?.endDate ?? "");

                if (!correctEndDate) {
                    setError("endDate", { message: "Data final da visita.", type: "validate" });
                    setFocus("endDate");
                    return;
                }

                const response = await fetch('/api/badge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        startDate: correctStartDate,
                        endDate: correctEndDate
                    }),
                });

                if (response.ok) {
                    toast.success("O crachá foi cadastrado com sucesso.");

                    const createdBadge = await response.json();
                    addBadge(createdBadge);
                } else {
                    toast.error(response.statusText);
                }
            }
        } catch (error) {
            toast.error(`Ocorreu um erro ao cadastrar o crachá. Tente novamente.`);
            console.error("Error ", error);
        } finally {
            setLoadingForm(false);
        }
    };

    const resetFields = () => {
        reset({
            type: undefined
        });

        setShowEmployeeInputs(false);
        setShowVisitorInputs(false);
        clearErrors();
    };

    useEffect(() => {
        reset({
            type: undefined
        });

        setShowEmployeeInputs(false);
        setShowVisitorInputs(false);

        clearErrors();
    }, [isSubmitSuccessful]);

    const handleCodeGenerator = async () => {
        setLoadingCode(true);

        try {
            const newCode = generateRandomCode();

            const response = await fetch(`/api/badge/${newCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                if (response.status === 202) {
                    toast.error("O crachá scaneado já existe no cadastro.");
                    setValue("code", "");
                } else {
                    setValue("code", newCode);
                }
            } else {
                toast.error("Ocorreu um erro ao tentar scanear o crachá.");
                setValue("code", "");
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao tentar scanear o crachá.");
            setValue("code", "");
        } finally {
            setLoadingCode(false);
        }
    };

    const handleChangeBadgeType = (badgeType: string) => {
        setShowEmployeeInputs(badgeType === "FIXED");
        setShowVisitorInputs(badgeType === "TEMPORARY");
    };

    const handleCheckDisabledButton = () => {
        const data = getValues();

        if (data.type === "FIXED") {
            if (data.code && data.employee) {
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        } else {
            if (
                data.code &&
                data.employee &&
                data.visitor &&
                validateDate(data?.startDate ?? "") &&
                validateDate(data?.endDate ?? "")
            ) {
                setDisabledButton(false);
            } else {
                setDisabledButton(true);
            }
        }
    };

    const groupBy = <T,>(array: T[], key: keyof T): { [key: string]: T[]; } => {
        return array.reduce((result, currentValue) => {
            const groupKey = currentValue[key] as unknown as string;
            (result[groupKey] = result[groupKey] || []).push(currentValue);
            return result;
        }, {} as { [key: string]: T[]; });
    };

    useEffect(() => {
        setLoadingEmployees(true);
        setLoadingAreas(true);
        setLoadingVisitors(true);

        const fetchEmployees = async () => {
            try {
                const response = await fetch("/api/employee");
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                    setLoadingEmployees(false);
                } else {
                    console.error("Erro ao buscar funcionários:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        };

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

        const fetchVisitors = async () => {
            try {
                const response = await fetch("/api/visitor");
                if (response.ok) {
                    const data = await response.json();
                    setVisitors(data);
                    setLoadingVisitors(false);
                } else {
                    console.error("Erro ao buscar os visitantes:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar visitantes:", error);
            }
        };

        fetchEmployees();
        fetchAreas();
        fetchVisitors();

        console.log(visitors);
    }, []);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
                <div className="w-2/6 flex flex-row gap-2">
                    <Tooltip content="Scanear Crachá">
                        <Button type="button" onClick={loadingCode ? () => { } : handleCodeGenerator} className='bg-primary text-white rounded-lg h-full'>
                            {loadingCode ? <Loading /> : <DynamicIcon icon="FaQrcode" className='text-2xl' />}
                        </Button>
                    </Tooltip>
                    <Controller
                        name={"code"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    handleCheckDisabledButton();
                                }}
                                placeholder="###.###"
                                fullWidth
                                label="Código do Crachá"
                                isReadOnly
                                errorMessage={errors.code?.message?.toString()}
                                isInvalid={errors.code?.message ? true : false}
                            />
                        )}
                    />
                </div>
                <div className="w-2/6">
                    <Controller
                        name={"type"}
                        control={control}
                        defaultValue={undefined}
                        render={({ field: { value, onChange } }) => (
                            <Select
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    handleChangeBadgeType(e.target.value);
                                    handleCheckDisabledButton();
                                }}
                                items={badgeTypes}
                                label="Tipo de Crachá"
                                placeholder="Selecione o tipo"
                                errorMessage={errors.type?.message?.toString()}
                                isInvalid={errors.type?.message ? true : false}
                                selectedKeys={value ? [value] : undefined}
                                renderValue={(items) => {
                                    return items.map((item) => (
                                        <div key={item.key}>
                                            {item.textValue}
                                        </div>
                                    ));
                                }}
                            >
                                {(type) => <SelectItem key={type.key} value={type.key} textValue={type.label}>{type.label}</SelectItem>}
                            </Select>
                        )}
                    />
                </div>
                {(showEmployeeInputs || showVisitorInputs) && (
                    <div className="w-2/6">
                        <Controller
                            name={"employee"}
                            control={control}
                            defaultValue={undefined}
                            render={({ field: { value, onChange } }) => (
                                <Select
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                        handleCheckDisabledButton();
                                    }}
                                    isLoading={loadingEmployees}
                                    items={employees}
                                    label={showEmployeeInputs ? "Funcionário" : "Responsável pela Visita"}
                                    placeholder={showEmployeeInputs ? "Selecione o funcionário" : "Selecione o responsável"}
                                    errorMessage={errors.employee?.message?.toString()}
                                    isInvalid={errors.employee?.message ? true : false}
                                    selectedKeys={value ? [value] : undefined}
                                    renderValue={(items) => {
                                        return items.map((item) => (
                                            <div key={item.key} className="flex items-center gap-2">
                                                <div className="flex flex-row gap-2">
                                                    <span className="text-tiny">{item.data?.name}</span>
                                                    <span className="text-default-500 text-tiny">({item.data?.company?.tradeName})</span>
                                                </div>
                                            </div>
                                        ));
                                    }}
                                >
                                    {(employee) => (
                                        <SelectItem key={employee.id} value={employee.id} textValue={employee.name}>
                                            <div className="flex flex-col">
                                                <span className="text-small">{employee.name}</span>
                                                <span className="text-tiny text-default-400">{employee?.company?.tradeName}</span>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                            )}
                        />
                    </div>
                )}
            </div>
            <Spacer y={2} />
            {(showEmployeeInputs || showVisitorInputs) && (
                <div className="flex flex-row gap-2">
                    <>
                        {showVisitorInputs && (
                            <div className="w-2/6">
                                <Controller
                                    name={"visitor"}
                                    control={control}
                                    defaultValue={undefined}
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                                handleCheckDisabledButton();
                                            }}
                                            isLoading={loadingVisitors}
                                            items={visitors}
                                            label={"Visitante"}
                                            placeholder={"Selecione o visitante"}
                                            errorMessage={errors.visitor?.message?.toString()}
                                            isInvalid={errors.visitor?.message ? true : false}
                                            selectedKeys={value ? [value] : undefined}
                                            renderValue={(items) => {
                                                return items.map((item) => (
                                                    <div key={item.key} className="flex items-center gap-2">
                                                        <div className="flex flex-row gap-2">
                                                            <span className="text-tiny">{item.data?.name}</span>
                                                            <span className="text-default-500 text-tiny">({maskCpf(item?.data?.cpf ?? "")})</span>
                                                        </div>
                                                    </div>
                                                ));
                                            }}
                                        >
                                            {(visitor) => (
                                                <SelectItem key={visitor.id} value={visitor.id} textValue={visitor.name}>
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{visitor.name}</span>
                                                        <span className="text-tiny text-default-400">{maskCpf(visitor.cpf)}</span>
                                                    </div>
                                                </SelectItem>
                                            )}
                                        </Select>
                                    )}
                                />
                            </div>
                        )}
                        <div className="w-4/6">
                            <Controller
                                name={"permissions"}
                                control={control}
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isLoading={loadingAreas}
                                        selectionMode='multiple'
                                        label="Permissões"
                                        placeholder="Selecione as permissões"
                                        errorMessage={errors.permissions?.message?.toString()}
                                        isInvalid={errors.permissions?.message ? true : false}
                                        // selectedKeys={field.value ? [field.value] : undefined}
                                        renderValue={(items) => items.map((item) => <Chip key={item.key} className='text-tiny' size='sm'>{item.textValue}</Chip>)}
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
                    </>
                </div>
            )}
            {showVisitorInputs && (
                <>
                    <Spacer y={2} />
                    <div className="flex flex-row gap-2">
                        <div className="w-2/6">
                            <Controller
                                name={"startDate"}
                                control={control}
                                defaultValue={formatDateToBrazilian(new Date().toLocaleDateString("en-CA"))}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        value={value}
                                        onChange={(e) => {
                                            onChange(maskDate(e.target.value));
                                            handleCheckDisabledButton();
                                        }}
                                        placeholder="dd/mm/aaaa"
                                        fullWidth
                                        label="Data Inicial da Visita"
                                        errorMessage={errors.startDate?.message?.toString()}
                                        isInvalid={errors.startDate?.message ? true : false}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-2/6">
                            <Controller
                                name={"endDate"}
                                control={control}
                                defaultValue={formatDateToBrazilian(new Date().toLocaleDateString("en-CA"))}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        value={value}
                                        onChange={(e) => {
                                            onChange(maskDate(e.target.value));
                                            handleCheckDisabledButton();
                                        }}
                                        placeholder="dd/mm/aaaa"
                                        fullWidth
                                        label="Data Final da Visita"
                                        errorMessage={errors.endDate?.message?.toString()}
                                        isInvalid={errors.endDate?.message ? true : false}
                                    />
                                )}
                            />
                        </div>
                        <div className="w-2/6">
                            <Controller
                                name={"observations"}
                                control={control}
                                defaultValue={undefined}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                            handleCheckDisabledButton();
                                        }}
                                        placeholder="Digite as observações necessárias"
                                        fullWidth
                                        label="Observações"
                                        errorMessage={errors.observations?.message?.toString()}
                                        isInvalid={errors.observations?.message ? true : false}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </>
            )}
            <Spacer y={2} />
            <div className="flex flex-row gap-2 items-center justify-between">
                <div className="w-2/3 flex flex-row gap-2">
                    <Button type="button" onClick={resetFields} className='bg-red-500 text-white rounded-full'>
                        <DynamicIcon icon="FaEraser" />
                        Limpar
                    </Button>
                    {loadingForm ? (
                        <Button type={"button"} className={`bg-gray-500 text-white rounded-full`}>
                            <Loading size={4} />
                            Cadastrando
                        </Button>
                    ) : (
                        <Button type={disabledButton ? "button" : "submit"} className={`${disabledButton ? "bg-gray-500" : "bg-primary"} text-white rounded-full`}>
                            <DynamicIcon icon="FaCheck" />
                            {disabledButton ? "Preencha o Formulário" : 'Cadastrar Crachá'}
                        </Button>
                    )}
                </div>
            </div>
        </form >
    );
};

export default BadgeForm;
