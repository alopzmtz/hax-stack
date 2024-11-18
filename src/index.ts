import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './routes/index.js'
import { logger } from './middleware/logger.js'
import { serve } from '@hono/node-server'

const app = new Hono()

app.use(cors())
app.use(logger())

app.use('/public/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

app.route('/', routes)

serve({ fetch: app.fetch, port: 8080 }, () => { console.log('Server is running on http://localhost:8080') })