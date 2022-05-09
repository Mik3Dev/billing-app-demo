import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes/email.route'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/email', router)

export default app
