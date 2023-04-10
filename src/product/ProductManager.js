import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function ProductManager(){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/products`).then((response)=>
        {setProducts(response.data)})
    },[])
    const [search, setSearch] = useState("")
    let INDEX = 0;
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>List Product</h2>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <Link className={'btn btn-primary'} to={'/form-create'}>Create new product</Link> &nbsp;
                        <button className={'btn btn-primary'} onClick={sortPrice}>Sort by age</button>
                    </div>
                    <div className={"col-4"}>
                        <input type="text" id={'search'} onChange={(event)=>{
                            setSearch(
                                event.target.value,
                            )
                        }}/> &nbsp;
                        <button className={'btn btn-primary'} onClick={searchByName}>Search</button>
                    </div>
                </div>
                <div className={"container"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th colSpan={2} style={{textAlign:"center"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(element => (
                            <tr key={element.id}>
                                <td>{++INDEX}</td>
                                <td><Link to={`/form-detail/${element.id}`} style={{textDecoration:"none"}}>{element.name}</Link></td>
                                <td>{element.price}</td>
                                <td>{element.quantity}</td>
                                <td>{element.category.name}</td>
                                <td>
                                    <Link className={'btn btn-warning'} to={`/form-update/${element.id}`}>Update</Link>
                                </td>
                                <td> <button onClick={() => deleteProduct(element.id)} className={'btn btn-danger'}>Delete</button>
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
            axios.delete(`http://localhost:8080/products/${id}`).then(() => {
                axios.get('http://localhost:8080/products').then((response) => {
                    setProducts(response.data)
                })
            })
        }
    }
    function sortPrice() {
        products.sort((a, b) => {
            return a.price - b.price
        })
        setProducts([...products])

    }
    function searchByName (){
        axios.get(`http://localhost:8080/products/search?search=${search}`).then((response) => {
            setProducts(response.data)
        })

    }
}