// app/todo/page.jsx
import { todos } from '../db.js'; // Adjust the import path based on where you put db.js
import { addTodo } from '../actions/action'; // You will create this next!

export default function TodoPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Next.js To-Do List</h1>
      
      {/* 
        Notice the form! 
        No onSubmit, no useState, no fetch. 
        Just action={addTodo} 
      */}
      <form action={addTodo} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          name="todoText" // This 'name' is how we extract data in the Server Action
          placeholder="What needs to be done?" 
          required 
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Add To-Do</button>
      </form>

      {/* Displaying the database items */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ padding: '0.5rem 0' }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}