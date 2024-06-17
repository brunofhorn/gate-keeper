import Image from "next/image";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <div className="max-w-md text-center flex flex-col items-center justify-center">
                    <Image src="/images/logo-dark.png" width={200} height={100} alt="Gate Keeper" />
                    <Image src="/images/login.svg" width={450} height={530} alt="Gate Keeper" />
                </div>
            </div>
            <div className="w-full bg-secondary lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
