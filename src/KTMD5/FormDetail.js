import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function FormDetail(){
    const param = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${param.id}`).then((response)=>
        {setProduct(response.data)})
    })
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Detail</h2>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <th>Title: </th>
                            <td>{product.title}</td>
                        </tr>
                        <tr>
                            <th>Price: </th>
                            <td>{product.price}</td>
                        </tr>
                        <tr>
                            <th>Description: </th>
                            <td>{product.description}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><Link className={'btn btn-danger'} to={'/products'}>Close</Link></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )

}