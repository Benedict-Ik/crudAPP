//creating HTTP server

const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require('path')

const connectDB = require("./server/database/connection")

const app = express();

dotenv.config({path: "config.env"})
const PORT = process.env.PORT || 8080


//log requests
app.use(morgan("tiny"))

//mongodb connection
connectDB();

//parse requests to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs")

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))


//load routers
app.use("/", require("./server/routes/router"))


// app.get("/", (req, res) => {
//     res.send("Crud Application")
// })

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/index.html'))
// });


// app.listen(5000, () => {
//   console.log('Listening on port ' + 5000);
// });

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });