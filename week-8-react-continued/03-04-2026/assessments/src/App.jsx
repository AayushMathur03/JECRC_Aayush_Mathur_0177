import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <Content />
    </LanguageProvider>
  );
}

export default App;
