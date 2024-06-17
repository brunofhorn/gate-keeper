"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DynamicIcon from "../helpers/DynamicIcon";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Loading } from "./Loading";
import { ToastContainer, toast } from "react-toastify";

const loginSchema = z.object({
    email: z.string().min(1, { message: "E-mail é obrigatório." }).email({ message: "É necessário informar um e-mail válido." }),
    password: z.string().min(1, { message: "Senha é obrigatória." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { register, handleSubmit, clearErrors, reset, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        setIsLoading(true);
        console.log(data);

        try {
            push("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao tentar efetuar o login.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetFields = () => {
        clearErrors();
        reset();
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <ToastContainer position="bottom-center" autoClose={10000} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        {...register("email")}
                        type="email"
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
                    <Input
                        {...register("password")}
                        label="Senha"
                        placeholder="Digite a sua senha"
                        isRequired
                        startContent={
                            <DynamicIcon icon="FaLock" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                <DynamicIcon icon={isVisible ? "FaEye" : "FaEyeSlash"} className="text-2xl text-default-400 pointer-events-none" />
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        errorMessage={errors.password?.message?.toString()}
                        isInvalid={errors.password?.message ? true : false}
                        classNames={{ label: "pb-1" }}
                    />
                </div>
                <div>
                    <Button type={isLoading ? "button" : "submit"} className={`w-full ${isLoading ? "bg-gray-500" : "bg-primary"} text-white p-2 rounded-full hover:bg-tertiary transition-colors duration-300`}>
                        {isLoading ? (
                            <>
                                <Loading />
                                <span>ENTRANDO</span>
                            </>
                        ) : (
                            <>
                                <DynamicIcon icon={"FaArrowRightToBracket"} />
                                <span>
                                    ENTRAR
                                </span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </>
    );

};

export default LoginForm;