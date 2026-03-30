import './App.css';
import Counter from './components/Counter.js';
import StateVsPropsDemo from './components/StateVsPropsDemo.js';
import TemperatureConverter from './components/TemperatureConverter.js';

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      {/* <StateVsPropsDemo></StateVsPropsDemo> */}
      <TemperatureConverter></TemperatureConverter>
    </div>
  )
}

export default App;
