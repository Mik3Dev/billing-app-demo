import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { router as billingRouter } from './routes/billing.route'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/billings', billingRouter)

app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found',
  })
})

export default app
