import React from "react";

function Header({ title, subtitle }) {
    return (
        <header style={{ 
            backgroundColor: '#282c34',
            padding: '20px',
            color: 'white',
            textAlign: 'center'
            }}>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </header>
    );
}

export default Header;