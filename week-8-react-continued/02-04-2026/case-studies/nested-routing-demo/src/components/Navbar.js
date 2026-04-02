import React from "react";
import { NavLink } from "react-router-dom";


function Navbar(){
   return (

    <nav style ={styles.nav}>
        <h2> style = {styles.nav} </h2>

        <div>
            <NavLink to="/" style={styles.link} >Home</NavLink>
            <NavLink to="/about" style={styles.link} >About</NavLink>
            <NavLink to="/contact" style={styles.link} >Contact</NavLink>
        </div>
    </nav>

   ); 
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        backgroundColor: "#1e293b"
    },

    logo: {
        margin: 0,
    },

    link: ({isActive}) => ({
        margin: "0 10px",
        textDecoration: "none",
        color: isActive ? "#38bdf8" : "white",
        fontWeight: "bold"
    })
};


export default Navbar;