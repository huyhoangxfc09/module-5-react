import * as Yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
export default function FormCreate(){
    const navigate = useNavigate()
    const Validation = Yup.object().shape({
        name : Yup.string().required("Required"),
        price: Yup.number().required("Required").min(5000,"The lowest price is 5000").max(1000000,"The highest price is 1000000"),
        quantity: Yup.number().required("Required").min(1,"The lowest quantity is 1"),
    })
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/products/categories`).then((response)=>
        {setCategories(response.data)})
    },[])
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Create</h2>
                <Formik
                    initialValues={{
                        name: "",
                        price: "",
                        quantity: "",
                        category: {
                            id: "",
                        }
                    }}
                    onSubmit={(values) =>{save(values)}}
                    validationSchema={Validation}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" name={'name'} className="form-control" id="name"/>
                            <ErrorMessage name={'name'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="number" name={'price'} className="form-control" id="price"/>
                            <ErrorMessage name={'price'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <Field type="number" name={'quantity'} className="form-control" id="quantity"/>
                            <ErrorMessage name={'quantity'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <Field as={"select"} type="text" name={'category.id'} className="form-control" id="category" default = {1}>
                                <option value={''}>---Category---</option>
                                {categories.map((element)=>(
                                    <option value={element.id}>{element.name}</option>
                                ))}
                            </Field>

                        </div>
                        <div className="mb-3">
                            <button className={'btn btn-primary'}>Create</button> &ensp;
                            <Link className={'btn btn-danger'} to={'/products'}>Close</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
    function save(values){
        console.log(values)
        axios.post('http://localhost:8080/products', values).then(() => {
            navigate('/products')
        })
    }
}