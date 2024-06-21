import RegisterForm from "@/layouts/components/RegisterForm";
import Link from "next/link";

export default function Register() {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-6 text-white text-center">Cadastro</h1>
            <h1 className="text-xs font-semibold mb-6 text-white/70 text-center">Preencha o formulário abaixo para ter acesso ao sistema.</h1>
            <RegisterForm />
            <div className="mt-4 text-sm text-white/70 text-center">
                <p>Já possui uma conta? <Link href="/register" className="text-primary hover:text-tertiary">Faça o Login</Link>
                </p>
            </div>
        </>
    );
}