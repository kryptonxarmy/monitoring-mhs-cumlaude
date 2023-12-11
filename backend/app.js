const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Welcome to the API")
})

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`)
})