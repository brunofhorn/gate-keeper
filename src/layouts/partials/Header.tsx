import Image from "next/image";
import DynamicIcon from "../helpers/DynamicIcon";
import { Input } from "@nextui-org/react";
import UserMenu from "./UserMenu";

const Header = () => {
    return (
        <>
            <div className="w-screen flex flex-row bg-secondary p-4">
                <div className="w-56">
                    <Image src="/images/logo.png" width={220} height={20} alt="Gate Keeper" />
                </div>
                <div className="flex flex-row w-full justify-between px-10">
                    <div>
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[25rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            placeholder="Digite para buscar..."
                            startContent={<DynamicIcon icon="FaMagnifyingGlass" width={18} />}
                            type="search"
                            radius="full"
                        />
                    </div>
                    <div>
                        <UserMenu />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;