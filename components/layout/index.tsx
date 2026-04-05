import Header from "@/components/header";

interface PropsInterface {
    children: React.ReactNode;
}

const Layout = (props: PropsInterface): React.JSX.Element => {
    return (
        <>
            <Header />
            <main className="layout-grid">
                {props.children}
            </main>
        </>
    );
};

export default Layout;
