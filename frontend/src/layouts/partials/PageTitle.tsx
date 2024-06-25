type PageTitleProps = {
    title?: string;
};

const PageTitle = ({ title = "Dashboard" }: PageTitleProps) => {
    return (
        <div className="px-10 py-5 w-full">
            <h2 className="text-white text-xl font-semibold">{title}</h2>
        </div>
    );
};

export default PageTitle;