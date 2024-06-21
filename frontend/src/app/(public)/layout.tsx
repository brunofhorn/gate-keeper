"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const path = usePathname();

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <div className="max-w-md text-center flex flex-col items-center justify-center">
                    <Image src={`/images${path}.svg`} width={450} height={530} alt="Gate Keeper" />
                </div>
            </div>
            <div className="w-full bg-secondary lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="flex flex-col justify-center items-center gap-8">
                        <div>
                            <Image src={"/images/logo.png"} width={200} height={40} alt="Gate Keeper" />
                        </div>
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
