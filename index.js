import express from 'express'
import AdminRoute from './routes/admin.route.js'
import CustomerRoute from './routes/customer.route.js'
import ProductRoute from './routes/product.route.js'
import TransactionRoute from './routes/transaction.route.js'
import PaymentRoute from './routes/payment.route.js'
import path from 'path'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const imagePath = express.static(path.join(process.cwd(), 'uploads'))
app.use('/image', imagePath)

app.get('/', (req, res) => {
    res.send("Helloworld!")
})

app.use('/admin', AdminRoute)
app.use('/customer', CustomerRoute)
app.use('/product', ProductRoute)
app.use('/transaction', TransactionRoute)
app.use('/payment', PaymentRoute)

app.listen(3100, () => {
    console.log('server started')
})
