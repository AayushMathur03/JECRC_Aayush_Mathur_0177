import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  return (
    <BrowserRouter>

    {/* // Add navigation links */}
      <nav styles={styles.nav}>
        <NavLink to="/" style={styles.link} end>
          Home
        </NavLink>
        <NavLink to="/about" style={styles.link}>
          About
        </NavLink>
        <NavLink to="/contact" style={styles.link}>
          Contact
        </NavLink>
      </nav>

    {/* // Define the routes for the application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles ={
  nav :{
    gap: "20px",
    display: "flex",
    padding: "15px",
    background: "#eee",
    justifyContent: "center",
  },
  link : ({isActive}) => ({
    textDecoration: "none",
    color: isActive ? "red" : "black",
    fontWeight: isActive ? "bold" : "normal",
  })
};

export default App;
