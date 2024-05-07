const express = require(`express`)
const app = express()

const PORT = 5000
/** load library cors */
const cors = require(`cors`)
app.use(express.static(__dirname))
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const userRoute = require(`./routes/user-route`)
const bukuRoute = require(`./routes/buku-route`)
// const transaksiRoute = require(`./routes/transaksi-route`)

app.use(userRoute)
app.use(bukuRoute)
// app.use(transaksiRoute)

app.listen(PORT, () => {
    console.log(`Server is running...`)
})