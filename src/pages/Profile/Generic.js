import './assets/css/bootstrap.min.css';
import './assets/css/main.css';
import { Outlet } from "react-router-dom";

import {Footer} from '../../components/Footer/Footer'
import {NavBar} from '../../components/Navbar/Navbar'
export {Root};

function Root(){

    return (
        <div className="flex-wrapper">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}