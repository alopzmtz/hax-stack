import type { Todo } from "../types/index.js";

interface TodoItemProps {
    todo: Todo;
  }
  
  export const TodoItem  = ({ todo }: TodoItemProps) => (
    <div class="todo-item" id={`todo-${todo.id}`}>
      <span>{todo.task}</span>
      <button 
        hx-delete={`/api/todos/${todo.id}`}
        hx-target={`#todo-${todo.id}`}
        hx-swap="outerHTML"
      >
        Delete
      </button>
    </div>
  )