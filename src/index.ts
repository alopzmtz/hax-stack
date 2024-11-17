import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './routes/index.js'
import { logger } from './middleware/logger.js'

const app = new Hono()

app.use(cors())
app.use(logger())

app.route('/', routes)

export default app
