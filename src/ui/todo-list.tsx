import type { Todo } from "../types/index.js";
import { TodoItem } from "./todo-item.js";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList  = ({ todos }: TodoListProps) => (
  <div class="mt-4">
    <h2>HTMX Todo List</h2>
    <form
      hx-post="/api/todos"
      hx-target="#todo-list"
      hx-swap="beforeend"
    >
      <input 
        type="text" 
        name="task" 
        placeholder="New task..." 
        required 
      />
      <button type="submit">Add</button>
    </form>
    <div id="todo-list">
      {todos.map(todo => <TodoItem todo={todo} />)}
    </div>
  </div>
)