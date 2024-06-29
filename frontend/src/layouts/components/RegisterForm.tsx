"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputProps } from "@nextui-org/input";
import { DetailedHTMLProps, InputHTMLAttributes, JSX, Ref, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import DynamicIcon from "../helpers/DynamicIcon";
import { Button } from "@nextui-org/button";
import { Loading } from "./Loading";
import { MergeWithAs } from "@nextui-org/system";
import { maskCpf } from "@/service/functions/maskCpf";

const registerSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório." }),
    cpf: z.string().min(1, { message: "O CPF é obrigatório." }),
    email: z.string().min(1, { message: "O e-mail é obrigatório." }).email({ message: "O e-mail está inválido." }),
    phone: z.string().min(1, { message: 'O telefone é obrigatório' }),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação de senha deve ter no mínimo 6 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        setIsLoading(true);
        console.log(data);

        try {
            console.log("TESTE");
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao tentar efetuar o login.");
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
                        startContent={
                            <DynamicIcon icon="FaUser" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        errorMessage={errors.name?.message?.toString()}
                        isInvalid={errors.name?.message ? true : false}
                        classNames={{ label: "pb-1" }}
                    />
                </div>
                <div>
                    {/* <Input
                        {...register("cpf")}
                        label="CPF"
                        placeholder="Digite o seu CPF"
                        isRequired
                        startContent={
                            <DynamicIcon icon="FaIdCard" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        errorMessage={errors.cpf?.message?.toString()}
                        isInvalid={errors.cpf?.message ? true : false}
                        classNames={{ label: "pb-1" }}
                    /> */}
                </div>
                <div>
                    <Input
                        {...register("email")}
                        label="E-mail"
                        placeholder="seuemail@empresa.com.br"
                        isRequired
                        startContent={
                            <DynamicIcon icon="FaEnvelope" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                                label="CPF"
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
                            startContent={
                                <DynamicIcon icon="FaLock" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => toggleVisibility('password')}>
                                    <DynamicIcon icon={isPasswordVisible ? "FaEye" : "FaEyeSlash"} className="text-2xl text-default-400 pointer-events-none" />
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
                            startContent={
                                <DynamicIcon icon="FaLock" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => toggleVisibility('confirmPassword')}>
                                    <DynamicIcon icon={isConfirmPasswordVisible ? "FaEye" : "FaEyeSlash"} className="text-2xl text-default-400 pointer-events-none" />
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
                            <Loading />
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