import axios from "axios";
import {useState} from "react";

export default function Search(setStudents){
    const [search,setSearch] = useState("")
    function handleClick (){
        axios.get(`http://localhost:8080/students/search?search=${search}`).then((response) => {
            setStudents(response.data)
        })

    }
    return(
        <>
            <input type="text" id={'search'} onChange={(event)=>{
                setSearch(
                    event.target.value,
                )

            }}/> &nbsp;
            <button className={'btn btn-primary'} onClick={handleClick}>Search</button></>
    )
}