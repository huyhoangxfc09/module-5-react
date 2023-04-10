import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.js';

export default function ProductManager(){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/products`).then((response)=>
        {setProducts(response.data)})
    },[])
    let INDEX = 0;
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>List Product</h2>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <Link className={'btn btn-primary'} to={'/form-create'}>Create new product</Link> &nbsp;
                    </div>
                </div>
                <div className={"container"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th colSpan={2} style={{textAlign:"center"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(element => (
                            <tr key={element.id}>
                                <td>{++INDEX}</td>
                                <td><Link to={`/form-detail/${element.id}`} style={{textDecoration:"none"}}>{element.title}</Link></td>
                                <td>{element.description}</td>
                                <td>{element.price}</td>
                                <td>
                                    <Link className={'btn btn-warning'} to={`/form-update/${element.id}`}>Update</Link>
                                </td>
                                <td> <button onClick={() => deleteProduct(element.id)}  className={'btn btn-danger'}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    function deleteProduct(id){
        if (window.confirm("OK")) {
            axios.delete(`http://localhost:3000/products/${id}`).then(() => {
                axios.get('http://localhost:3000/products').then((response) => {
                    setProducts(response.data)
                })
            })
        }
    }


}