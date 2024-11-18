import { Hono } from 'hono'
import { cors } from 'hono/cors'
import routes from './routes/index.js'
import { logger } from './middleware/logger.js'
import 'vite/modulepreload-polyfill'

const app = new Hono()

app.use(cors())
app.use(logger())


app.route('/', routes)

export default app
