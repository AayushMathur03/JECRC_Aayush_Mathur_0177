import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// This is a React component. It is a JavaScript function that returns JSX, which is a syntax extension that looks like HTML.
// JSX = JavaScript XML. It allows us to write HTML-like code in our JavaScript files, which React can then render to the DOM.
// function App(){
//   return (
//     <div>
//       <h1> Welcome to React Training</h1>
//       <p> This content is rendered by React, not vanilla JavaScript.</p>
//     </div>
//   );
// }


// This is the entry point of the React application. It uses ReactDOM to render the App component into the DOM element with the id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

