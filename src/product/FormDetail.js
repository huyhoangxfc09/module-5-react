import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function FormDetail(){
    const param = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:8080/products/${param.id}`).then((response)=>
        {setProduct(response.data)})
    })
    // const [categories, setCategories] = useState([])
    // useEffect(()=>{
    //     axios.get(`http://localhost:8080/products/categories`).then((response)=>
    //     {setCategories(response.data)})
    // },[])
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Detail</h2>
                        <form>
                            <table>
                               <tbody>
                               <tr>
                                   <th>Name: </th>
                                   <td>{product.name}</td>
                               </tr>
                                <tr>
                                    <th>Price: </th>
                                    <td>{product.price}</td>
                                </tr>
                                <tr>
                                    <th>Quantity: </th>
                                    <td>{product.quantity}</td>
                                </tr>
                                <tr>
                                    <th>Category: </th>
                                    <td>{product.category?.name}</td>
                                </tr>
                               <tr>
                                   <td colSpan={'2'}><Link className={'btn btn-danger'} to={'/products'}>Close</Link></td>
                               </tr>
                               </tbody>
                            </table>
                        </form>
            </div>
        </>
    )

}