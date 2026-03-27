import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Props', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Component Communication', completed: false }
  ]);
  
  // Add new todo - receives data from child (TodoForm)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  // Toggle todo status - receives data from child (TodoItem)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo - receives data from child (TodoItem)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>📝 Todo App - Communication Patterns</h1>
      <p style={{ color: '#666' }}>
        <strong>Patterns shown:</strong><br/>
        • Parent → Child: Props passed to TodoForm, TodoItem, TodoStats<br/>
        • Child → Parent: Callbacks (addTodo, toggleTodo, deleteTodo)<br/>
        • Sibling Communication: TodoForm updates state, TodoStats displays it
      </p>
      
      {/* Child to Parent: TodoForm sends data UP via onAddTodo */}
      <TodoForm onAddTodo={addTodo} />
      
      {/* Parent to Child: Stats receives todos via props */}
      <TodoStats todos={todos} />
      
      {/* Parent to Child: TodoItem receives data and callbacks */}
      <div>
        <h3>Your Tasks</h3>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

// import React from "react";
// import Header from "./components/Header";
// import Card from "./components/Card";
// import UserProfile from "./components/UserProfile";

// // function App() {
// //   const [count, setCount] = React.useState(0);
// //   const [timestamp, setTimestamp] = React.useState(new Date().toLocaleTimeString());

// //   const updateTimestamp = () => {
// //     setTimestamp(new Date().toLocaleTimeString());
// //   };
// //   return (
// //     <div>
// //       <h1>Virtual DOM Demo</h1>
// //       {/*This component re renders but only the number changes*/}
// //       <div style={{padding:'20px',border:'1px solid #ccc'}}>
// //         <h2>Counter: {count}</h2>
// //         <button onClick={() => setCount(count + 1)}>
// //           Increment (Re-renders)
// //         </button>
// //       </div>
// //       {/*This updates independently*/}
// //       <div style={{padding:'20px',marginTop:'20px',border:'1px solid #ccc'}}>
// //         <h2>TimeStamp: {timestamp}</h2>
// //         <button onClick={updateTimestamp}>
// //           Update Time (Only this changes)
// //         </button>
// //       </div>
// //       <p style={{color:"grey"}}>Static content - React doesn't touch this</p>
// //       {/*Static Content - never changes*/}
// //       </div>
// //   );
// // }

// // function App() {
// //   const projects = [
// //     {id: 1, title: "Project Alpha", content: "A cutting-edge AI project.", icon: "🤖", isFeatured: true},
// //     {id: 2, title: "Project Beta", content: "A innovative web development project.", icon: "💻", isFeatured: false},
// //     {id: 3, title: "Project Gamma", content: "A groundbreaking mobile app project.", icon: "📱", isFeatured: true}
// //   ];

// //   return (
// //     <div>
// //       <Header
// //       title="component composition demo"
// //       subtitle="Building UIs with reusable pieces"
// //       />
// //       <div style={{
// //         display: 'flex',
// //         flexWrap: 'wrap',
// //         justifyContent: 'center',
// //         padding: '20px' }}>
// //         {projects.map((project) => (
// //           <Card
// //             key={project.id}
// //             title={project.title}
// //             content={project.content}
// //             icon={project.icon}
// //             isFeatured={project.isFeatured}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// function App() {
//   const handleEdit =() => {
//     alert("Edit profile clicked!");
//   };
//   return(
//     <div style={{padding: '20px'}}>
//       <h1>Prop Validation Demo</h1>
//       <UserProfile
//         name = "John Doe"
//         age={28}
//         email="john@example.com"
//         isActive={true}
//         hobbies={["Reading", "Traveling", "Cooking"]}
//         onEdit={handleEdit}
//       />
//       <UserProfile
//         name="Jane Smith"
//         age="twenty"
//         email="jane@example.com"
//         onEdit={handleEdit}
//       />
//     </div>
//   );
// }

// export default App;
// // function App() {
// //   const userName = "Alice Johnson";
// //   const userRole = "Developer";
// //   const isLoggedIn = true;
// //   const unreadMessages = 5;
// //   const getGreeting = () => {
// //     const hours = new Date().getHours();
// //     if (hours < 12) return "Good morning";
// //     if (hours < 18) return "Good afternoon";
// //     return "Good evening";
// //   };
// //   const notificationBadge = unreadMessages > 0 ? (
// //     <span className="badge">{unreadMessages}</span>) : null;
  
// //    return (
// //     <div className="App">
// //       <h1>{getGreeting()}, {userName}!</h1>
// //       <p>Your role: {userRole}</p>
// //       {isLoggedIn ? (
// //         <div>
// //           <p>You have {unreadMessages} unread messages.</p>
// //           {notificationBadge}
// //         </div>
// //       ) : (
// //         <p>Please log in to see your messages.</p>
// //       )}
// //       {/* List rendering example */}
// //       <ul>
// //         {["Learn React", "Build Projects", "Deploy in Production"]
// //         .map((task, index) => (
// //           <li key={index}>{task}</li>
// //         ))}
// //       </ul>

// //     </div>
// //    ) 
// // }