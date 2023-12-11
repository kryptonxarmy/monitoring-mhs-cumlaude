const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


app.get('/api/auth',(req,res) => {
    res.send([
        { id: 1, nama: "Brice Swyre", nim: "1201234567", date: "2023-01-01", keterangan: "Red", status: "Delivered" },
        { id: 2, nama: "John Doe", nim: "1201234568", date: "2023-01-02", keterangan: "Blue", status: "Approved by" },
        { id: 3, nama: "Jane Doe", nim: "1201234569", date: "2023-01-03", keterangan: "Green", status: "Processing" },
        { id: 4, nama: "Alice Wonderland", nim: "1201234570", date: "2023-01-04", keterangan: "Yellow", status: "Delivered" },
        { id: 5, nama: "Bob Builder", nim: "1201234571", date: "2023-01-05", keterangan: "Purple", status: "Pending" },
      ])
})

app.listen(port,() => {
    console.log('listen in localhost ' + port)
})