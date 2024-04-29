import express from 'express'
import router from './routes/servidores.route.js';

const app = express()

app.use(express.static('data'))
app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})