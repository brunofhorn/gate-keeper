"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import DynamicIcon from "../helpers/DynamicIcon";
import { Button } from "@nextui-org/button";
import { Loading } from "./Loading";
import { maskCpf } from "@/service/functions/maskCpf";
import { useRouter } from "next/navigation";
import { validateCpf } from "@/service/functions/validateCpf";
import { validEmail } from "@/service/functions/validEmail";

const registerSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }).max(70, { message: "O tamanho máximo do nome é 70 caracteres." }),
    username: z.string().optional(),
    cpf: z.string().min(1, { message: "O CPF é obrigatório." }).max(14, { message: "O tamanho máximo do CPF é 14 caracteres." }),
    email: z.string().min(1, { message: "O e-mail é obrigatório." }).email({ message: "O e-mail está inválido." }).max(50, { message: "O tamanho máximo do e-mail é 50 caracteres." }),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.").max(20, { message: "O tamanho máximo da senha é de 20 caracteres." }),
    confirmPassword: z.string().min(6, "A confirmação de senha deve ter no mínimo 6 caracteres.").max(20, { message: "O tamanho máximo da senha é de 20 caracteres." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const username = watch("name")?.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '.');

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setIsLoading(true);

        try {
            if (!validateCpf(data.cpf)) {
                toast.error("O CPF está inválido.");
                return;
            }

            if (!validEmail(data.email)) {
                toast.error("O e-mail está inválido.");
                return;
            }

            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    cpf: data?.cpf?.replace(/\D/g, "").toString(),
                }),
            });

            if (response.ok) {
                toast.success("O cadastro foi efetuado com sucesso. Efetue o login.");

                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao tentar cadastrar o usuário.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleVisibility = (input: string) => {
        if (input === "password") {
            setIsPasswordVisible(!isPasswordVisible);
        } else {
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
        }
    };

    return (
        <>
            <ToastContainer position="bottom-center" autoClose={10000} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <Input
                        {...register("name")}
                        label="Nome completo"
                        placeholder="Digite o seu nome completo"
                        isRequired
                        size="sm"
                        maxLength={70}
                        startContent={
                            <DynamicIcon icon="FaUser" className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        errorMessage={errors.name?.message?.toString()}
                        isInvalid={errors.name?.message ? true : false}
                        classNames={{ label: "pb-1" }}
                    />
                </div>
                <div>
                    <Input
                        {...register("username")}
                        isReadOnly
                        label="Nome do usuário"
                        value={username}
                        size="sm"
                        startContent={
                            <DynamicIcon icon="FaUser" className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        classNames={{ label: "pb-1" }}
                    />
                </div>
                <div>
                    <Input
                        {...register("email")}
                        label="E-mail"
                        placeholder="seuemail@empresa.com.br"
                        isRequired
                        size="sm"
                        maxLength={50}
                        startContent={
                            <DynamicIcon icon="FaEnvelope" className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        errorMessage={errors.email?.message?.toString()}
                        isInvalid={errors.email?.message ? true : false}
                        classNames={{ label: "pb-1" }}
                    />
                </div>
                <div>
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
                                size="sm"
                                label="CPF"
                                maxLength={14}
                                errorMessage={errors.cpf?.message?.toString()}
                                isInvalid={errors.cpf?.message ? true : false}
                            />
                        )}
                    />
                </div>
                <div className="flex flex-row gap-3">
                    <div>
                        <Input
                            {...register("password")}
                            label="Senha"
                            placeholder="Digite a sua senha"
                            isRequired
                            size="sm"
                            maxLength={20}
                            startContent={
                                <DynamicIcon icon="FaLock" className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => toggleVisibility('password')}>
                                    <DynamicIcon icon={isPasswordVisible ? "FaEye" : "FaEyeSlash"} className="text-lg text-default-400 pointer-events-none" />
                                </button>
                            }
                            type={isPasswordVisible ? "text" : "password"}
                            errorMessage={errors.password?.message?.toString()}
                            isInvalid={errors.password?.message ? true : false}
                            classNames={{ label: "pb-1" }}
                        />
                    </div>
                    <div>
                        <Input
                            {...register("confirmPassword")}
                            label="Confirmar Senha"
                            placeholder="Redigite a senha"
                            isRequired
                            size="sm"
                            maxLength={20}
                            startContent={
                                <DynamicIcon icon="FaLock" className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => toggleVisibility('confirmPassword')}>
                                    <DynamicIcon icon={isConfirmPasswordVisible ? "FaEye" : "FaEyeSlash"} className="text-lg text-default-400 pointer-events-none" />
                                </button>
                            }
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            errorMessage={errors.confirmPassword?.message?.toString()}
                            isInvalid={errors.confirmPassword?.message ? true : false}
                            classNames={{ label: "pb-1" }}
                        />
                    </div>
                </div>
                <Button type={isLoading ? "button" : "submit"} className={`w-full ${isLoading ? "bg-gray-500" : "bg-primary"} text-white p-2 rounded-full hover:bg-primaryHover transition-colors duration-300`}>
                    {isLoading ? (
                        <>
                            <Loading size={4} />
                            <span>CADASTRANDO</span>
                        </>
                    ) : (
                        <>
                            <DynamicIcon icon={"FaCheck"} />
                            <span>
                                CADASTRAR
                            </span>
                        </>
                    )}
                </Button>
            </form>
        </>
    );
};

export default RegisterForm;