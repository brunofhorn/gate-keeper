import Image from "next/image";

const Header = () => {
    return (
        <>
            <div className="w-screen flex flex-row bg-secondary p-4">
                <div className="w-56">
                    <Image src="/images/logo.png" width={220} height={20} alt="Gate Keeper" />
                </div>
                <div className="flex flex-row w-full justify-between px-5">
                    <div>INPUT SEARCH</div>
                    <div>ICONS</div>
                </div>
            </div>
        </>
    );
};

export default Header;