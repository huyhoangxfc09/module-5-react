import {Link, Route, Routes} from "react-router-dom";
import StudentManager from "./StudentManager";
import FormCreate from "./FormCreate";
import FormUpdate from "./FormUpdate";

export default function Navbar(){
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <ul className={"navbar-nav"}>
                    <li className={"nav-item"}>
                        <Link to={'/students'} style={{textDecoration: "none"}}>Home</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path={'students'} element={<StudentManager/>}></Route>
                <Route path={'form-create'} element={<FormCreate/>}></Route>
                <Route path={'form-update/:id'} element={<FormUpdate/>}></Route>
            </Routes>
        </>
    );
}