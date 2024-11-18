import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'vite/modulepreload-polyfill'
import { logger } from './middleware/logger.js'
import routes from './routes/index.js'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

app.use(cors())
app.use(logger())

app.route('/', routes)

if (import.meta.env.PROD) {
    serve({ fetch: app.fetch, port: 8080 }, () => console.log('Server is running on http://localhost:8080'))
}

export default app