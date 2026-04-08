import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "./employeeSlice";

function EmployeeEdit({ selectedEmployee, onClose }) {
  const [name, setName] = useState(selectedEmployee?.name || "");
  const [position, setPosition] = useState(selectedEmployee?.position || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setPosition(selectedEmployee.position);
    }
  }, [selectedEmployee]);

  const handleUpdate = (e) => {

    dispatch(
      updateEmployee({
        id: selectedEmployee.id,
        name,
        position,
      })
    );

    clearEdit();
  };

  const clearEdit = () => {
    setName("");
    setPosition("");
    onClose();
  };

  return (
    <div>
      <h2>Edit Employee</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
      <button onClick={clearEdit}>Cancel</button>
    </div>
  );
}

export default EmployeeEdit;