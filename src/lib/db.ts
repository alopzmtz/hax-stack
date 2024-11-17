import type { Todo } from "../types/index.js";

// Simulating a database with in-memory storage
export class TodoDB {
  private todos: Todo[] = [];

  async create(task: string): Promise<Todo> {
    const todo = { id: Date.now(), task, completed: false };
    this.todos.push(todo);
    return todo;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  async getAll(): Promise<Todo[]> {
    return [...this.todos];
  }
}