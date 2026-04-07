import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        // add the navbar sorce here
        <Route path="/" element={<Layout />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;