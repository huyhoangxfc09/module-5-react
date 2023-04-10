import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";

export default function FormCreate(){
    const navigate = useNavigate()
    const Validation = Yup.object().shape({
        age : Yup.number().required("Required").min(18,"Minimum 18 years old")
            .max(30,"Maximum 30 years old"),
        address: Yup.string().required("Required"),
        name: Yup.string().required("Required")
    })
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Create</h2>
            <Formik
                initialValues={{
                    name: "",
                    age: "",
                    address: "",
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
                        <label htmlFor="age" className="form-label">Age</label>
                        <Field type="number" name={'age'} className="form-control" id="age"/>
                        <ErrorMessage name={'age'}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <Field type="text" name={'address'} className="form-control" id="address"/>
                        <ErrorMessage name={'address'}/>
                    </div>
                    <div className="mb-3">
                        <button className={'btn btn-primary'}>Create</button> &ensp;
                        <Link className={'btn btn-danger'} to={'/students'}>Close</Link>
                    </div>
                </Form>
            </Formik>
            </div>
        </>
    )
    function save(values){
        axios.post('http://localhost:8080/students', values).then(() => {
            navigate('/students')
        })
    }
}