import Menu from "../components/Menu";
import { mainMenu } from "@/config/mainMenu";
import { bottomMenu } from "@/config/bottomMenu";

const SidebarMenu = () => {
    return (
        <>
            <div className="h-[calc(100vh-72px)] w-56 bg-primary rounded-2xl flex flex-col justify-between px-3 py-7">
                <div className="flex flex-col w-full">
                    <Menu menu={mainMenu} />
                </div>
                <div className="w-full">
                    <Menu menu={bottomMenu} />
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;