import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
export  default function Router1() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <hr />
            <Routes>
                <Route path="/home" element={<Home></Home>} />
                <Route path="/about" element={<About></About>} />
                <Route path="/contact" element={<Contact></Contact>} />
            </Routes>
        </div>
    );
}
