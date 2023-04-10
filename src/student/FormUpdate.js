import {Link, useNavigate, useParams} from "react-router-dom";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useEffect, useState} from "react";

export default function FormUpdate(){
    const navigate = useNavigate()
    const param = useParams()
    const [student, setStudent] = useState({})
    console.log(param)
    useEffect(() => {
        axios.get(`http://localhost:8080/students/${param.id}`).then((response) => {
            setStudent(response.data)
        })
    }, [])
    const Validation = Yup.object().shape({
        age : Yup.number().required("Required").min(18,"Minimum 18 years old")
            .max(30,"Maximum 30 years old"),
        address: Yup.string().required("Required"),
        name: Yup.string().required("Required")
    })
    return(
        <>
            <div className={"container"}>
                <h2 style={{textAlign: "center"}}>Update</h2>
                <Formik
                    initialValues={{
                        id: param.id,
                        name: student.name,
                        age: student.age,
                        address: student.address,
                    }}
                    onSubmit={(values) =>{save(values)}}
                    validationSchema={Validation}
                    enableReinitialize={true}>
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
                            <button className={'btn btn-primary'} >Updated</button> &ensp;
                            <Link className={'btn btn-danger'} to={'/students'}>Close</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
    function save(values){
        axios.post(`http://localhost:8080/students`, values).then(() => {
            navigate('/students')
        })
    }

}