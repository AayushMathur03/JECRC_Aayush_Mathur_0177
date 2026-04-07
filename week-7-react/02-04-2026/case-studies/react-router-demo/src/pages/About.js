import React from "react";
function About() {
    return(
        <div style ={styles.container}>
            <h1>About Us</h1>
            <p>This application demonstrates React Router functionality.</p>
            <p>It includes navigation, routing, and component rendering.</p>
        </div>
    );
}

const styles ={
    container:{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#fff3cd",
    }
};

export default About;