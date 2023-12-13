import { Header } from "../../components";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";

export function MainLayout() {
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer /> 
        </>
    );
}
