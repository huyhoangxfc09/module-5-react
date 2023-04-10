import {useEffect, useState} from "react";
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import {Link} from "react-router-dom";
export default function StudentManager(){
    const [students,setStudents] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/students`).then((response) => {
            setStudents(response.data.content)
        })
    }, [])

    const [search,setSearch] = useState("")

    return(
        <>
            <div className={"container"}>
            <h2 style={{textAlign: "center"}}>List Student</h2>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <Link className={'btn btn-primary'} to={'/form-create'}>Create new student</Link> &nbsp;
                        <button className={'btn btn-primary'} onClick={sortAge}>Sort by age</button>
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
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th colSpan={2} style={{textAlign:"center"}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map(element => (
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.age}</td>
                        <td>{element.address}</td>
                        <td>
                            <Link className={'btn btn-warning'} to={`/form-update/${element.id}`}>Update</Link>
                        </td>
                        <td> <button onClick={() => deleteStudent(element.id)} className={'btn btn-danger'}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </>
    )
    function deleteStudent(id){
        if (window.confirm("OK")) {
            axios.delete(`http://localhost:8080/students/${id}`).then(() => {
                axios.get('http://localhost:8080/students').then((response) => {
                    setStudents(response.data)
                })
            })
        }
    }
    function sortAge() {
        students.sort((a, b) => {
            return a.age - b.age
        })
        setStudents([...students])

    }

    function searchByName (){
        axios.get(`http://localhost:8080/students/search?search=${search}`).then((response) => {
            setStudents(response.data)
        })

    }

}