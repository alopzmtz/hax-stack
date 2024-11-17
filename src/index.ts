import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './routes/index.js'
import { logger } from './middleware/logger.js'

const app = new Hono()

app.use(cors())
app.use(logger())

app.use('/public/*', serveStatic({ root: './src/' }))
app.use('/favicon.ico', serveStatic({ path: './src/public/favicon.ico'}))

app.route('/', routes)


const port = 8787 
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
