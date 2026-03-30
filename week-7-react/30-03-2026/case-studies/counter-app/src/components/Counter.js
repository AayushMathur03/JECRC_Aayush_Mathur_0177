import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = React.useState(0);
    const [step, setStep] = React.useState(1);

    const [lastAction, setLastAction] =React.useState("None");

    const increment = () => {
        setCount(count + step);
        setLastAction("Incremented" + step);
    }

    const decrement = () => {
        setCount(count - step);
        setLastAction("Decremented" + step);
    }

    const reset = () => {
        setCount(0);
        setStep(1);
        setLastAction("Reset to 0");
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>

            <div style={{ fontSize: '48px', margin: '20px' }}>
            <h1>Counter: {count}</h1>
            </div>


            {/* Step input */}
            <div style={{ marginBottom: '20px' }}>
                <label> Step : </label>
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                    style={{ marginLeft: '10px', width : '60px' }}
                />
            </div>




            {/*Action buttons*/ }
            <div>
                <p>Last Action: {lastAction}</p>
                <button onClick={increment} style={buttonStyle}>Increment</button>
                <button onClick={decrement} style={buttonStyle}>Decrement</button>
                <button onClick={reset} style={{ ...buttonStyle, marginLeft: '10px' }}>Reset</button>
            </div>
        </div>
    )
}

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0px 20px ',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
};



export default Counter;