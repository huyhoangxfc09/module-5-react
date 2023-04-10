import {Link, Route, Routes} from "react-router-dom";
import ProductManager from "./ProductManager";
import FormCreate from "./FormCreate";
import FormUpdate from "./FormUpdate";
import FormDetail from "./FormDetail";


export default function Navbar(){
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <ul className={"navbar-nav"}>
                    <li className={"nav-item"}>
                        <Link to={'/products'} style={{textDecoration: "none"}}>Home</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path={'products'} element={<ProductManager/>}></Route>
                <Route path={'form-create'} element={<FormCreate/>}></Route>
                <Route path={'form-update/:id'} element={<FormUpdate/>}></Route>
                <Route path={'form-detail/:id'} element={<FormDetail/>}></Route>
            </Routes>
        </>
    );
}