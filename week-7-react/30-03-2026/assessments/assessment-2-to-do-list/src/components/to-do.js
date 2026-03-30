import { useState } from "react";

export default function TodoList() {
  // Step 1: Array state — each todo is an object
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice Code", completed: true },
  ]);
  const [input, setInput] = useState("");

  // Step 2: Add — immutable update with spread
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  // Step 3: Delete — filter() removes matched id
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Step 4: Toggle — map() flips completed for matched id
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Todo List</h2>

      {/* Input Row */}
      <div style={{ display: "flex", gap: "8px", margin: "1rem 0" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Enter task..."
          style={{ flex: 1, padding: "10px", fontSize: "14px" }}
        />
        <button onClick={addTodo} style={{ padding: "10px 20px" }}>
          Add
        </button>
      </div>

      {/* Step 5: Render list with map() */}
      {todos.map(todo => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px",
            marginBottom: "8px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />

          {/* Text — strikethrough if done */}
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              flex: 1,
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "#000",
            }}
          >
            {todo.text}
          </span>

          {/* Delete button */}
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </div>
      ))}

      {/* Empty state */}
      {todos.length === 0 && (
        <p style={{ color: "#999", textAlign: "center" }}>No tasks yet!</p>
      )}
    </div>
  );
}