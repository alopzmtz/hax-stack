import { Hono } from 'hono';
import { TodoDB } from '../../lib/db.js';
import { Counter } from '../../ui/counter.js';
import { TodoList } from '../../ui/todo-list.js';
import { jsxRenderer } from 'hono/jsx-renderer';
import { BaseLayout } from '../../ui/layouts/base-layout.js';

const views = new Hono();
const db = new TodoDB();

views.use('*', jsxRenderer(({ children }) => {return <>{children}</>}))

views.get('/', async (c) => {
  const todos = await db.getAll();

  return c.render(
    <BaseLayout>
      <Counter />
      <TodoList todos={todos} />
    </BaseLayout>
  )
  
});

export default views;