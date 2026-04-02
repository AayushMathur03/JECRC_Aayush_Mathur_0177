import Navbar from "./Navbar";
import {Outlet} from 'react-router-dom';

function Layout() {
    return (
        <>
            <Navbar />

            <div style={Styles.container}>
                <Outlet />
            </div>
        </>
    );
}

const Styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    }
};

export default Layout;