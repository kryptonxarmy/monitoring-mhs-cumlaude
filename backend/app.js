const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
// const { User } = require('./models');
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.get('/', (req,res) => {
    res.send("Welcome to the API")
})

// app.get('/users', async (req,res) => {
//     const data = await User.findAll()

//     const result = {
//         status : 200,
//         data : data
//     }
//     res.send(result)
// })

app.post('/contoh', (req,res) => {
    const dataDiterima = req.body

    console.log(dataDiterima)
})

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`)
})