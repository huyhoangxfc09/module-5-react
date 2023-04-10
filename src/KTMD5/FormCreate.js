import * as Yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
export default function FormCreate(){
    const navigate = useNavigate()
    const Validation = Yup.object().shape({
        title : Yup.string().required("Required"),
        price: Yup.number().required("Required").min(5000000,"The lowest price is 5000000").max(100000000,"The highest price is 100000000"),
        description: Yup.string().required("Required")
    })
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Create</h2>
                <Formik
                    initialValues={{
                        title: "",
                        price: "",
                        description: "",
                    }}
                    onSubmit={(values) =>{save(values)}}
                    validationSchema={Validation}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <Field type="text" name={'title'} className="form-control" id="title"/>
                            <ErrorMessage name={'title'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="number" name={'price'} className="form-control" id="price"/>
                            <ErrorMessage name={'price'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field as={"textarea"} name={'description'} className="form-control" id="description"/>
                            <ErrorMessage name={'description'}/>
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
        axios.post('http://localhost:3000/products', values).then(() => {
            navigate('/products')
        })
    }
}