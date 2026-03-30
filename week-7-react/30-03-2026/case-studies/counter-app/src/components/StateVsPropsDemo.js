import React, { useState } from "react";


function DisplayCard({ title, value, onChange, style }) {
    const [internalCount, setInternalCount] = useState(0);

    return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            border: '2px solid blue',
            borderRadius: '10px',
            margin: '20px',
            ...style
        }}>
            <h1>{title}</h1>
            <p>Props Value from Parent: {value}</p>

            <button onClick={() => setInternalCount(internalCount + 1)}>
                Internal Count: {internalCount}
            </button>

            <button onClick={() => onChange(value + 1)}>
                Update Parent Count
            </button>
        </div>
    );
}


function StateVsPropsDemo() {
    const [parentCount, setParentCount] = useState(0);
    const [parentStep, setParentStep] = useState(1);
    const [displayColor, setDisplayColor] = useState("lightblue");

    const handleParentCountChange = (newCount) => {
        setParentCount(newCount);
        setDisplayColor(newCount % 2 === 0 ? "lightblue" : "lightcoral");
    }

    return(
    <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
      <p>Parent Count: {parentCount}</p>
      <button onClick={() => setParentStep(parentStep + 1)} 
      style={{marginLeft: '20px'}}>
        Increase Step (Current: {parentStep})</button>
      <button onClick={() => setDisplayColor
        (displayColor === 'lightblue' ? 'lightcoral' : 'lightblue')} 
        style={{marginLeft: '20px'}}>
        Toggle Display Color</button>
      <DisplayCard
        title="Child Component 1 Counter Card" 
        value={parentCount} 
        onChange={handleParentCountChange} 
        style={{backgroundColor: displayColor}}
      />
      <DisplayCard
        title="Child Component 2 Counter Card" 
        value={parentCount} 
        onChange={handleParentCountChange} 
        style={{backgroundColor: displayColor}}
      />
    </div>
    );
}

export default StateVsPropsDemo;
