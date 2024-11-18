import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from './middleware/logger.js'
import routes from './routes/index.js'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

app.use(cors())
app.use(logger())

app.use('*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

app.route('/', routes)

serve({ fetch: app.fetch, port: 8080 }, () => console.log('Server is running on http://localhost:8080'))
