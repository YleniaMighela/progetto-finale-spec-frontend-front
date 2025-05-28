// importo il componente dalla libreria di react-router
import { Outlet } from "react-router-dom";

// importo il componente che forma il layout
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}