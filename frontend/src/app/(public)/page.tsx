import LoginForm from "@/layouts/components/LoginForm";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-6 text-white text-center">Login</h1>
            <h1 className="text-xs font-semibold mb-6 text-white/70 text-center">Efetue o login para acessar o sistema de controle de acesso</h1>
            <LoginForm />
            <div className="mt-4 text-sm text-white/70 text-center">
                <p>Ainda não possui uma conta? <Link href="/register" className="text-primary hover:text-tertiary">Cadastre-se</Link>
                </p>
            </div>
        </>
    );
}