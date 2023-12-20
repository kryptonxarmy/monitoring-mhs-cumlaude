const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Welcome to the API")
})

app.post('/contoh', (req,res) => {
    const dataDiterima = req.body

    console.log(dataDiterima)
})

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`)
})