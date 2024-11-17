import { Hono } from "hono";
import api from "./api/todos.js";
import views from "./views/index.js";

const routes = new Hono()

routes.route('/api', api)
routes.route('/', views)

export default routes