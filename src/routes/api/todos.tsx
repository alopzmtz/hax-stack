import { Hono } from 'hono';
import { TodoDB } from '../../lib/db.js';
import { TodoItem } from '../../ui/todo-item.js';

const api = new Hono();
const db = new TodoDB();

api.post('/todos', async (c) => {
  const { task } = await c.req.parseBody();
  const todo = await db.create(task as string);
  return c.render(<TodoItem todo={todo} />);
});

api.delete('/todos/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(id);
  return c.body(null, 200);
});

export default api;