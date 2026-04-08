import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "./employeeSlice";


function EmployeeAdd() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const dispatch = useDispatch(); 
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: Date.now(),
            name,
            position
        };
        dispatch(addEmployee(newEmployee));
        setName('');
        setPosition('');
    };
    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Position:</label>
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
}

export default EmployeeAdd;