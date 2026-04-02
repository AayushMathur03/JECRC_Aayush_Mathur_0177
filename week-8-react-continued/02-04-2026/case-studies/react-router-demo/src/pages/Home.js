import React from 'react';

function Home() {
    return (
        <div style={styles.container}>
            <h1>Home Page</h1>
            <p>Welcome to the React Router Demo Application!</p>
            <p>This is the page where users land first.</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#f0f8ff",
    }
};

export default Home;