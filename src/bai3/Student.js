import {Component} from "react";
// import 'bootstrap/dist/js/bootstrap.js';
// import 'jquery/dist/jquery.js';
// import 'popper.js/dist/popper.js';
export default class Student extends Component{
    constructor(props) {
        super(props);
        this.state = {

            studentList:[],
            form:{
                name: "",
                phone: "",
                email: "",
            },
            isValid: false,
            indexSelected: -1
        }
    }
    handleChange = (event) => {
        this.setState((state) => {
            const form = state.form
            form[event.target.name] = event.target.value
            return { form }
        },
        () => this.checkInvalidForm())
    }
    handleSelect = (studentSelected, index) => {
        this.setState({
            form: JSON.parse(JSON.stringify(studentSelected)),
            indexSelected: index
        },
            ()=>this.handleSubmit())
    }
    checkInvalidForm = () => {
        const { name, phone, email } = this.state.form
        const value = name && phone && email
        this.setState({
            isValid: value
        })
    }
    handleSubmit = () => {
        console.log(this.state.form)
        console.log(this.state)
        if(this.state.isValid){
            const newList = this.state.studentList
            if (this.state.indexSelected > -1){
                newList.splice(this.state.indexSelected,1,this.state.form)
            }else {
                newList.push(this.state.form)
            }
            this.setState({
                form: JSON.parse(JSON.stringify(this.state.form)),
                indexSelected: this.state.indexSelected+1,
                studentList: newList
            })
        }
    }
    render () {
        const { studentList, form } = this.state
        return (
            <div>
                <div>
                    <h1>Student List</h1>
                    <div>
                        <label>Name: </label>
                        <input name="name" value={this.state.form.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Phone: </label>
                        <input type="number" name="phone" value={this.state.form.phone} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input name="email" value={this.state.form.email} onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <table>
                        <thead>
                        <tr>
                            <th>Index</th>
                           <th>Name</th>
                           <th>Phone</th>
                           <th>Email</th>
                           <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList.map(element =>(
                            <tr>
                                <th>{this.state.indexSelected}</th>
                                <td>{element.name}</td>
                                <td>{element.phone}</td>
                                <td>{element.email}</td>
                                <td><button className={"btn btn-secondary"} onClick={()=>this.handleSelect(form,this.state.indexSelected)}>Edit</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}